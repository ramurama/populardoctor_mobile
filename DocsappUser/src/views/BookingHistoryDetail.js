import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Content, Text, Footer } from 'native-base';
import UserBooking from '../components/UserBooking';
import commonStyles from '../commons/styles';
import { VIEW_SEARCH, VIEW_HOME_FAVORITES } from '../constants/viewNames';
import { SECONDARY, WHITE, PRIMARY } from '../config/colors';
import { FONT_WEIGHT_BOLD } from '../config/fontWeight';
import { FONT_L } from '../config/fontSize';
import { connect } from 'react-redux';
import APIService from '../services/APIService';
import Toast from 'react-native-simple-toast';

class BookingHistoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderFooterDoneButton() {
    return (
      <TouchableOpacity onPress={this._handleDoneButton}>
        <Footer style={commonStyles.footerButtonStyle}>
          <View style={commonStyles.footerButtonView}>
            <Text style={commonStyles.footerButtonText}>Done</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  _handleDoneButton = () => {
    const screenOpenedFromHome = this.props.navigation.getParam(
      'screenOpenedFromHome'
    );
    if (screenOpenedFromHome) {
      this.props.navigation.navigate(VIEW_HOME_FAVORITES);
    } else {
      this.props.navigation.navigate(VIEW_SEARCH);
    }
  };

  _renderFooterCancelButton() {
    return (
      <TouchableOpacity onPress={this._handleCancelButton}>
        <Footer style={{ backgroundColor: PRIMARY }}>
          <View style={styles.cancelButtonView}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  _handleCancelButton = () => {
    const bookingId = this.props.navigation.getParam('bookingId');
    Alert.alert('Cancel', 'Are you sure you want to cancel this booking?', [
      { text: 'No' },
      {
        text: 'Yes',
        onPress: () => {
          APIService.cancelBooking(this.props.token, bookingId, status => {
            if (status) {
              Toast.show('Appointment cancelled', Toast.SHORT);
              this.props.navigation.navigate(VIEW_SEARCH);
            } else {
              Toast.show('Unknown Error. Contact customer care', Toast.SHORT);
            }
          });
        }
      }
    ]);
  };

  render() {
    const { getParam } = this.props.navigation;
    const { name, address, pincode } = getParam('hospital');
    return (
      <Container>
        <Content>
          <UserBooking
            hospitalName={name}
            hospitalAddress={address}
            hospitalPincode={pincode}
            bookingDay={getParam('tokenDate')}
            availableTime={getParam('startTime') + ' - ' + getParam('endTime')}
            doctorName={getParam('doctorName')}
            specialization={getParam('specialization')}
            tokenNumber={getParam('tokenNumber')}
            bookingTime={getParam('tokenTime')}
            enableQR={getParam('enableQR')}
            tokenType={getParam('tokenType')}
            bookingId={getParam('bookingId')}
            showBookingId={true}
          />
        </Content>
        {getParam('showDone') && this._renderFooterDoneButton()}
        {getParam('showCancel') && this._renderFooterCancelButton()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps)(BookingHistoryDetail);

const styles = StyleSheet.create({
  cancelButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButtonText: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_BOLD,
    padding: 10,
    color: SECONDARY
  }
});
