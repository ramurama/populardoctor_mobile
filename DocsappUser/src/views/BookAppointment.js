import { Container, Content, Footer, Icon, Text } from 'native-base';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import { isStringsEqual } from '../commons/utils';
import TokenTimePanel from '../components/TokenTimePanel';
import TouchableToken from '../components/TouchableToken';
import {
  HELPER_TEXT_COLOR,
  PRIMARY,
  SECONDARY,
  SHADOW_COLOR,
  WHITE
} from '../config/colors';
import { FONT_L, FONT_M, FONT_S, FONT_XL } from '../config/fontSize';
import {
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_THIN
} from '../config/fontWeight';
import {
  VIEW_BOOKING_CONFIRMATION,
  VIEW_HOME_FAV_BOOKING_CONFIRMATION
} from '../constants/viewNames';
import Spinner from 'react-native-loading-spinner-overlay';
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { TOKEN_OPEN } from '../constants/tokenStatus';
import commonStyles from '../commons/styles';
import { TOKEN_PREMIUM } from '../constants/tokenTypes';

class BookAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      selectedTokenNumber: '',
      selectedTokenType: '',
      selectedTokenTime: '',
      tokens: []
    };
  }

  componentDidMount() {
    const isBookingOpen = this.props.navigation.getParam('isBookingOpen');
    if (isBookingOpen) {
      this.setState({ spinner: true }, () => {
        const { token, bookingData } = this.props;
        const { doctorId, scheduleId } = bookingData;
        APIService.getTokens(token, doctorId, scheduleId, data => {
          //sort tokens based on token number
          data.tokens.sort((a, b) => a.number - b.number);
          //filter premium tokens if user is not premium
          let tokens = data.tokens;
          if (!this.props.isPremiumUser) {
            tokens = tokens.filter(token => {
              if (!isStringsEqual(token.type, TOKEN_PREMIUM)) {
                return token;
              }
            });
          }
          this.setState({ tokens, spinner: false });
        });
      });
    }
  }

  _renderBookingContentContainer() {
    const { hospital, startTime, endTime } = this.props.bookingData;
    const { streetName, building } = JSON.parse(hospital.address);
    return (
      <View style={styles.bookingContent}>
        <View style={styles.infoContainer}>
          <Icon name="hospital" style={styles.iconStyle} type="FontAwesome5" />
          <Text
            style={styles.hospitalNameStyle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {hospital.name}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon style={styles.iconStyle} name="schedule" type="MaterialIcons" />
          <Text style={styles.timeStyle} numberOfLines={1} ellipsizeMode="tail">
            {startTime + ' - ' + endTime}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="room" style={styles.iconStyle} type="MaterialIcons" />
          <Text
            style={styles.hospitalAddressStyle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${building}, ${streetName} ${hospital.pincode}`}
          </Text>
        </View>
      </View>
    );
  }

  _renderTokenSeparator() {
    return (
      <View style={styles.headContainerStyle}>
        <View style={styles.line} />
        <Text style={styles.tokenHeader}> Choose a token </Text>
        <View style={styles.line} />
      </View>
    );
  }

  _handleTokenSelected = (
    selectedTokenNumber,
    selectedTokenType,
    selectedTokenTime
  ) => {
    this.setState({
      selectedTokenNumber,
      selectedTokenType,
      selectedTokenTime
    });
  };

  _renderTokenListItem(item) {
    return (
      <TouchableToken
        tokenNumber={item.number}
        tokenType={item.type}
        tokenTime={item.time}
        isDisabled={!isStringsEqual(item.status, TOKEN_OPEN)}
        isSelected={isStringsEqual(this.state.selectedTokenNumber, item.number)}
        onSelection={this._handleTokenSelected}
      />
    );
  }

  _renderTokensList() {
    return (
      <FlatList
        data={this.state.tokens}
        renderItem={({ item }) => this._renderTokenListItem(item)}
        numColumns={3}
        style={{ height: '100%' }}
        keyExtractor={(item, index) => item.number}
      />
    );
  }

  _renderTokenContainer() {
    return (
      <View style={styles.tokenContainer}>{this._renderTokensList()}</View>
    );
  }

  _renderBookingsNotOpenedYet() {
    return (
      <View style={{ margin: 30 }}>
        <Text style={styles.notOpenedTextStyle} numberOfLines={3}>
          Bookings not opened yet, still you can make a call.
        </Text>
      </View>
    );
  }

  _renderBookNowButton() {
    return (
      <TouchableOpacity
        disabled={this.state.selectedTokenNumber === ''}
        onPress={this._handleBookNow}
      >
        <Footer
          style={
            this.state.selectedTokenNumber === ''
              ? styles.footerDisabledStyle
              : commonStyles.footerButtonStyle
          }
        >
          <View style={commonStyles.footerButtonView}>
            <Text style={commonStyles.footerButtonText}>Book Now</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  _renderCallNowButton() {
    return (
      <TouchableOpacity onPress={this._handleCallNow}>
        <Footer style={commonStyles.footerButtonStyle}>
          <View style={commonStyles.footerButtonView}>
            <Text style={commonStyles.footerButtonText}>Call Now</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  _handleCallNow = () => {
    const { contactNumber } = this.props.userSupport;
    Linking.openURL(`tel:${contactNumber}`);
  };

  _handleBookNow = () => {
    const screenOpenedFromHome = this.props.navigation.getParam(
      'screenOpenedFromHome'
    );
    const {
      selectedTokenType,
      selectedTokenNumber,
      selectedTokenTime
    } = this.state;
    this.props.setBookingData({
      ...this.props.bookingData,
      tokenType: selectedTokenType,
      tokenNumber: selectedTokenNumber,
      tokenTime: selectedTokenTime
    });
    let bookingConfirmationView = VIEW_BOOKING_CONFIRMATION;
    if (screenOpenedFromHome) {
      bookingConfirmationView = VIEW_HOME_FAV_BOOKING_CONFIRMATION;
    }
    return this.props.navigation.navigate(bookingConfirmationView, {
      screenOpenedFromHome
    });
  };

  _renderTokenTimePanel() {
    return (
      !isStringsEqual(this.state.selectedTokenNumber, '') && (
        <TokenTimePanel timeRange={this.state.selectedTokenTime} />
      )
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  render() {
    let isBookingOpen = this.props.navigation.getParam('isBookingOpen');
    // isBookingOpen = true;
    return (
      <Container>
        {this._renderBookingContentContainer()}
        {this._renderTokenSeparator()}
        <Content scrollEnabled={true}>
          {isBookingOpen && this._renderTokenContainer()}
          {!isBookingOpen && this._renderBookingsNotOpenedYet()}
          {this._renderSpinner()}
        </Content>
        {this._renderTokenTimePanel()}
        {isBookingOpen && this._renderBookNowButton()}
        {!isBookingOpen && this._renderCallNowButton()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  bookingData: state.bookingData,
  userSupport: state.userSupport,
  isPremiumUser: state.isPremiumUser
});

export default connect(
  mapStateToProps,
  Actions
)(BookAppointment);

const styles = StyleSheet.create({
  footerDisabledStyle: {
    backgroundColor: SHADOW_COLOR
  },
  footerEnabledStyle: {
    backgroundColor: SECONDARY
  },
  line: {
    flex: 1,
    borderBottomWidth: 3,
    borderBottomColor: 'lightgrey'
  },
  iconStyle: {
    fontSize: FONT_XL,
    color: SECONDARY
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headContainerStyle: {
    // flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  tokenHeader: {
    flex: 2,
    color: SECONDARY,
    fontSize: FONT_M,
    fontWeight: FONT_WEIGHT_THIN,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  bookingContent: {
    padding: 12
    // flex: 1
  },
  hospitalNameStyle: {
    fontSize: FONT_L,
    color: SECONDARY,
    padding: 8,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  timeStyle: {
    fontSize: FONT_S,
    color: HELPER_TEXT_COLOR,
    padding: 8
  },
  hospitalAddressStyle: {
    fontSize: FONT_S,
    color: HELPER_TEXT_COLOR,
    padding: 8
  },
  tokenContainer: {
    padding: 8,
    alignItems: 'center'
  },
  notOpenedTextStyle: {
    alignSelf: 'center',
    fontSize: FONT_M,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: HELPER_TEXT_COLOR
  }
});
