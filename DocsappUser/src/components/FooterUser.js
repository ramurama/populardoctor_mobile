import React from 'react';
import { StyleSheet } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import commonStyles from '../commons/styles';
import PropTypes from 'prop-types';
import {
  VIEW_HOME,
  VIEW_FAVORITES,
  VIEW_SEARCH,
  VIEW_NAV_USER,
  VIEW_BOOKING_HISTORY,
  VIEW_MENU,
  VIEW_HOME_FAVORITES,
  VIEW_HOME_BOOKING_HISTORY,
  VIEW_HOME_MENU,
  VIEW_NAV_HOME_BOOKING_HISTORY,
  VIEW_NAV_HOME_MENU
} from '../constants/viewNames';
import {
  PRIMARY,
  ICON_INACTIVE,
  ICON_ACTIVE,
  BACKGROUND_3
} from '../config/colors';

const props = {
  activeButton: PropTypes.string.isRequired
};

class FooterUser extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderHomeButton() {
    return (
      <Button
        style={
          this.props.activeButton === VIEW_HOME
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() => this.props.navigation.navigate(VIEW_HOME)}
      >
        <Icon
          name="home"
          type="MaterialIcons"
          style={
            this.props.activeButton === VIEW_HOME
              ? styles.iconActive
              : styles.iconInActive
          }
        />
      </Button>
    );
  }

  _renderFavoritesButton() {
    return (
      <Button
        style={
          this.props.activeButton === VIEW_FAVORITES
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() =>
          this.props.navigation.navigate(VIEW_HOME_FAVORITES, {
            showFooter: true
          })
        }
      >
        <Icon
          name="heart"
          type="AntDesign"
          style={
            this.props.activeButton === VIEW_FAVORITES
              ? styles.iconActive
              : styles.iconInActive
          }
        />
      </Button>
    );
  }

  _renderSearchButton() {
    return (
      <Button
        style={
          this.props.activeButton === VIEW_SEARCH
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() => this.props.navigation.navigate(VIEW_NAV_USER)}
      >
        <Icon
          name="search"
          type="MaterialIcons"
          style={
            this.props.activeButton === VIEW_SEARCH
              ? styles.iconActive
              : styles.iconInActive
          }
        />
      </Button>
    );
  }

  _renderBookingHistoryButton() {
    return (
      <Button
        style={
          this.props.activeButton === VIEW_BOOKING_HISTORY
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() =>
          this.props.navigation.navigate(VIEW_HOME_BOOKING_HISTORY, {
            showFooter: true
          })
        }
      >
        <Icon
          name="calendar"
          type="Entypo"
          style={
            this.props.activeButton === VIEW_BOOKING_HISTORY
              ? styles.iconActive
              : styles.iconInActive
          }
        />
      </Button>
    );
  }

  _renderProfileButton() {
    return (
      <Button
        style={
          this.props.activeButton === VIEW_MENU
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() =>
          this.props.navigation.navigate(VIEW_HOME_MENU, {
            showFooter: true
          })
        }
      >
        <Icon
          name="user"
          type="Entypo"
          style={
            this.props.activeButton === VIEW_MENU
              ? styles.iconActive
              : styles.iconInActive
          }
        />
      </Button>
    );
  }

  render() {
    return (
      <Footer style={commonStyles.shadow}>
        <FooterTab>
          {this._renderHomeButton()}
          {this._renderFavoritesButton()}
          {this._renderSearchButton()}
          {this._renderBookingHistoryButton()}
          {this._renderProfileButton()}
        </FooterTab>
      </Footer>
    );
  }
}

export default FooterUser;

const styles = StyleSheet.create({
  iconInActive: {
    color: ICON_INACTIVE
  },
  iconActive: {
    color: ICON_ACTIVE
  },
  buttonBgInActive: {
    backgroundColor: PRIMARY,
    borderRadius: 0
  },
  buttonBgActive: {
    backgroundColor: BACKGROUND_3,
    borderRadius: 0,
    height: '100%'
  }
});
