import React from 'react';
import { View, StyleSheet, Platform, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { PRIMARY, SECONDARY } from '../../config/colors';
import {
  VIEW_DR_CHANGE_PASSWORD,
  VIEW_NAV_DR,
  VIEW_DR_RATING,
  VIEW_LOGIN,
  VIEW_DR_SUPPORT
} from '../../constants/viewNames';
import DrawerItem from '../../components/DrawerItem';
import {
  CHANGE_PASSWORD,
  DR_MY_RATING,
  LOGOUT,
  DR_SUPPORT
} from '../../constants/strings';
import { DBService } from '../../services/DBService';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { FONT_M, FONT_L, FONT_XL, FONT_XXXL } from '../../config/fontSize';
import { FONT_WEIGHT_MEDIUM, FONT_WEIGHT_XBOLD } from '../../config/fontWeight';
import { isNullOrEmpty } from '../../commons/utils';
import APIService from '../../services/APIService';
import { AsyncDataService } from '../../services/AsyncDataService';
import { KEY_DOCTOR_PD_NUMBER } from '../../constants/AsyncDataKeys';
import { isNullOrEmpty } from '../../commons/utils';

class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedItem: 'Home'
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    const { userSupport, setUserSupport } = this.props;
    if (isNullOrEmpty(userSupport)) {
      APIService.getSupportDetails(support => setUserSupport(support));
    }
    this._fetchAndUpdatePdNumber();
  }

  async _fetchAndUpdatePdNumber() {
    let doctorPdNumber = await AsyncDataService.getItem(KEY_DOCTOR_PD_NUMBER);
    console.log(doctorPdNumber);
    if (isNullOrEmpty(doctorPdNumber)) {
      APIService.getDoctorPdNumber(this.props.token, async res => {
        console.log(res);
        doctorPdNumber = res;
        await AsyncDataService.setItem(KEY_DOCTOR_PD_NUMBER, doctorPdNumber);
      });
    }
    this.props.setDoctorPdNumber(doctorPdNumber);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    console.log('Back button is pressed');
    return true;
  };

  _handleLogout = () => {
    DBService.logoutUser();
    this.props.navigation.navigate(VIEW_LOGIN);
  };

  _renderUserContent() {
    const { userData } = this.props;
    return (
      <View style={styles.profileContentStyle}>
        {/* <View style={[styles.flex1, styles.avatarView]}>
          <Avatar large rounded title="RR" activeOpacity={0.7} />
        </View> */}
        <View style={styles.userContentTextView}>
          <Text
            style={styles.userNameStyle}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {userData.fullName}
          </Text>
          <Text style={styles.mobileNumTextStyle}>{userData.mobile}</Text>
          <Text style={styles.mobileNumTextStyle}>
            {this.props.doctorPdNumber}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container>
        {this._renderUserContent()}
        <Content scrollEnabled={false}>
          <DrawerItem
            title='Home'
            icon='home'
            iconType='MaterialCommunityIcons'
            pressedItem={this.state.pressedItem}
            onItemPress={() =>
              this.setState({ pressedItem: 'Home' }, () =>
                this.props.navigation.navigate(VIEW_NAV_DR)
              )
            }
          />
          <DrawerItem
            title={DR_MY_RATING}
            pressedItem={this.state.pressedItem}
            icon='chart-line'
            iconType='MaterialCommunityIcons'
            onItemPress={() =>
              this.setState({ pressedItem: DR_MY_RATING }, () =>
                this.props.navigation.navigate(VIEW_DR_RATING)
              )
            }
          />
          <DrawerItem
            title={DR_SUPPORT}
            pressedItem={this.state.pressedItem}
            icon='support'
            iconType='FontAwesome'
            onItemPress={() =>
              this.setState({ pressedItem: DR_SUPPORT }, () =>
                this.props.navigation.navigate(VIEW_DR_SUPPORT)
              )
            }
          />
          <DrawerItem
            title={CHANGE_PASSWORD}
            pressedItem={this.state.pressedItem}
            icon='onepassword'
            iconType='MaterialCommunityIcons'
            onItemPress={() =>
              this.setState({ pressedItem: CHANGE_PASSWORD }, () =>
                this.props.navigation.navigate(VIEW_DR_CHANGE_PASSWORD, {
                  headerRequired: true
                })
              )
            }
          />
          <DrawerItem
            title={LOGOUT}
            icon='logout'
            iconType='MaterialCommunityIcons'
            pressedItem={this.state.pressedItem}
            onItemPress={this._handleLogout}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData,
  userSupport: state.userSupport,
  token: state.token,
  doctorPdNumber: state.doctorPdNumber
});

export default connect(
  mapStateToProps,
  Actions
)(Drawer);

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  menuIcon: {
    color: PRIMARY,
    fontSize: FONT_XXXL,
    paddingLeft: 5
  },
  titleText: {
    color: PRIMARY,
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  bodyStyle: {
    flex: 3
  },
  backIconStyle: {
    color: PRIMARY,
    paddingLeft: 5
  },
  profileContentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    backgroundColor: SECONDARY,
    margin: 0,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingBottom: 20,
    paddingRight: 5
  },
  mobileNumTextStyle: {
    fontSize: FONT_M,
    color: PRIMARY,
    marginTop: 5,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  userNameStyle: {
    fontSize: FONT_XL,
    color: PRIMARY,
    marginTop: 10,
    fontWeight: FONT_WEIGHT_XBOLD
  },
  avatarView: {
    paddingLeft: 10
  },
  userContentTextView: {
    paddingLeft: 15,
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});
