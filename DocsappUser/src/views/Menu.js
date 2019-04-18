import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { DBService } from '../services/DBService';
import {
  VIEW_LOGIN,
  VIEW_BOOKING_HISTORY,
  VIEW_CHANGE_PASSWORD,
  VIEW_FAVORITES,
  VIEW_CUSTOMER_SUPPORT,
  VIEW_MENU
} from '../constants/viewNames';
import MenuCard from '../components/MenuCard';
import { BACKGROUND_1, ON_PRIMARY, SECONDARY } from '../config/colors';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { FONT_XL, FONT_XXXL } from '../config/fontSize';
import { FONT_WEIGHT_BOLD } from '../config/fontWeight';
import Header from '../components/HeaderUser';
import FooterUser from '../components/FooterUser';
import { PROFILE } from '../constants/strings';

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderUserContent() {
    const { userData } = this.props;
    const nameArray = userData.fullName.split(' ');
    let avatarName = '';
    nameArray.forEach(str => {
      avatarName += str[0];
    });
    return (
      <View style={styles.profileContentStyle}>
        <Avatar xlarge rounded title={avatarName} activeOpacity={0.7} />
        <Text style={styles.userNameStyle}>{userData.fullName}</Text>
        <Text style={styles.mobileNumTextStyle}>{userData.mobile}</Text>
      </View>
    );
  }

  _renderMenuCards() {
    const showFooter = this.props.navigation.getParam('showFooter');
    return (
      <View>
        {!showFooter && (
          <MenuCard
            iconName="calendar"
            menuTitle="My Bookings"
            onPress={() => this.props.navigation.navigate(VIEW_BOOKING_HISTORY)}
          />
        )}
        <MenuCard
          iconName="lock"
          menuTitle="Change Password"
          onPress={() => this.props.navigation.navigate(VIEW_CHANGE_PASSWORD)}
        />
        {!showFooter && (
          <MenuCard
            iconName="heart"
            menuTitle="Favorites"
            onPress={() => this.props.navigation.navigate(VIEW_FAVORITES)}
          />
        )}
        <MenuCard
          iconName="support"
          menuTitle="Customer Support"
          onPress={() => this.props.navigation.navigate(VIEW_CUSTOMER_SUPPORT)}
        />
        <MenuCard
          iconName="logout"
          menuTitle="Logout"
          onPress={() => {
            DBService.logoutUser();
            this.props.navigation.navigate(VIEW_LOGIN);
          }}
        />
      </View>
    );
  }

  render() {
    const showFooter = this.props.navigation.getParam('showFooter');
    return (
      <Container>
        {showFooter && <Header title={PROFILE} />}
        <Content padder style={styles.contentStyle}>
          {this._renderUserContent()}
          {this._renderMenuCards()}
        </Content>
        {showFooter && <FooterUser activeButton={VIEW_MENU} {...this.props} />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userData
});

export default connect(mapStateToProps)(Menu);

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: BACKGROUND_1
  },
  mobileNumTextStyle: {
    fontSize: FONT_XL,
    color: 'grey',
    margin: 10,
    marginTop: 5
  },
  userNameStyle: {
    fontSize: FONT_XXXL,
    color: ON_PRIMARY,
    marginTop: 10
  },
  profileContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15
  },
  changePasswordButtonText: {
    color: SECONDARY,
    fontWeight: FONT_WEIGHT_BOLD
  },
  changePasswordModalView: {
    width: '90%'
  },
  passwordErrorMsg: {
    color: 'red',
    fontSize: 15,
    paddingTop: 8
  },
  changePasswordModal: {
    height: 230,
    width: 300
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
