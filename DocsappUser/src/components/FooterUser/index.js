import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import commonStyles from '../../commons/styles';
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
} from '../../constants/viewNames';
import {
  PRIMARY,
  ICON_INACTIVE,
  ICON_ACTIVE,
  BACKGROUND_3,
  SECONDARY
} from '../../config/colors';

const props = {
  activeButton: PropTypes.string.isRequired
};

const activeSearchIcon = (
  <Image
    source={require('./bookdoc-active.png')}
    style={{
      height: 50,
      width: 50
    }}
  />
);

const inActiveSearchIcon = (
  <Image
    source={require('./bookdoc-inactive.png')}
    style={{
      height: 60,
      width: 60,
      bottom: 3,
      shadowOffset: { height: 1, width: 0 },
      shadowColor: 'grey',
      shadowOpacity: 0.3
    }}
  />
);

class FooterUser extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderHomeButton() {
    const iconStyle =
      this.props.activeButton === VIEW_HOME
        ? styles.iconActive
        : styles.iconInActive;
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
          style={[styles.font30, iconStyle]}
        />
      </Button>
    );
  }

  _renderFavoritesButton() {
    const iconStyle =
      this.props.activeButton === VIEW_FAVORITES
        ? styles.iconActive
        : styles.iconInActive;
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
          style={[iconStyle, styles.font25]}
        />
      </Button>
    );
  }

  _renderSearchButton() {
    return (
      <Button
        style={styles.buttonBgInActive}
        onPress={() => this.props.navigation.navigate(VIEW_NAV_USER)}
      >
        {this.props.activeButton === VIEW_SEARCH
          ? activeSearchIcon
          : inActiveSearchIcon}
      </Button>
    );
  }

  _renderBookingHistoryButton() {
    const iconStyle =
      this.props.activeButton === VIEW_BOOKING_HISTORY
        ? styles.iconActive
        : styles.iconInActive;
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
          style={[iconStyle, styles.font25]}
        />
      </Button>
    );
  }

  _renderProfileButton() {
    const iconStyle =
      this.props.activeButton === VIEW_MENU
        ? styles.iconActive
        : styles.iconInActive;
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
        <Icon name="user" type="Entypo" style={[iconStyle, styles.font25]} />
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
    borderRadius: 0,
    borderBottomWidth: 4,
    borderColor: PRIMARY
  },
  buttonBgActive: {
    // backgroundColor: BACKGROUND_3,
    borderRadius: 0,
    height: '100%',
    borderBottomWidth: 4,
    borderColor: SECONDARY
  },
  font25: {
    fontSize: 25
  },
  font30: {
    fontSize: 30
  }
});
