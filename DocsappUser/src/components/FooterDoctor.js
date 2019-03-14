import React from "react";
import { Footer, FooterTab, Button, Text, Icon } from "native-base";
import { StyleSheet } from "react-native";
import {
  VIEW_DR_SCHEDULE,
  VIEW_DR_CURRENT_BOOKINGS,
  VIEW_DR_VISIT_CONFIRMATION,
  VIEW_DR_BOOKING_HISTORY,
  VIEW_NAV_DR_QR
} from "../constants/viewNames";
import {
  ICON_INACTIVE,
  ICON_ACTIVE,
  BACKGROUND_3,
  PRIMARY
} from "../config/colors";
import {
  DR_SCHEDULE,
  DR_CURRENT_BOOKINGS,
  DR_BOOKING_HISTORY,
  DR_VISIT_CONFIRMATION
} from "../constants/strings";
import commonStyles from "../commons/styles";
import PropTypes from "prop-types";

const propTypes = {
  activeButton: PropTypes.string.isRequired
};

class FooterDoctor extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderScheduleButton() {
    return (
      <Button
        style={
          this.props.activeButton === DR_SCHEDULE
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() =>
          this.props.navigation.navigate(VIEW_DR_SCHEDULE, {
            title: DR_SCHEDULE
          })
        }
      >
        <Icon
          name="calendar-clock"
          type="MaterialCommunityIcons"
          style={
            this.props.activeButton === DR_SCHEDULE
              ? styles.iconActive
              : styles.iconInActive
          }
        />
      </Button>
    );
  }

  _renderCurrentBookingsButton() {
    return (
      <Button
        style={
          this.props.activeButton === DR_CURRENT_BOOKINGS
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() =>
          this.props.navigation.navigate(VIEW_DR_CURRENT_BOOKINGS, {
            title: DR_CURRENT_BOOKINGS
          })
        }
      >
        <Icon
          name="profile"
          type="AntDesign"
          style={
            this.props.activeButton === DR_CURRENT_BOOKINGS
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
          this.props.activeButton === DR_BOOKING_HISTORY
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() =>
          this.props.navigation.navigate(VIEW_DR_BOOKING_HISTORY, {
            title: DR_BOOKING_HISTORY
          })
        }
      >
        <Icon
          name="history"
          type="MaterialCommunityIcons"
          style={
            this.props.activeButton === DR_BOOKING_HISTORY
              ? styles.iconActive
              : styles.iconInActive
          }
        />
      </Button>
    );
  }

  _renderVisitConfirmationButton() {
    return (
      <Button
        style={
          this.props.activeButton === DR_VISIT_CONFIRMATION
            ? styles.buttonBgActive
            : styles.buttonBgInActive
        }
        onPress={() =>
          this.props.navigation.navigate(VIEW_NAV_DR_QR)
        }
      >
        <Icon
          name="ticket"
          type="Foundation"
          style={
            this.props.activeButton === DR_VISIT_CONFIRMATION
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
          {this._renderScheduleButton()}
          {this._renderCurrentBookingsButton()}
          {this._renderBookingHistoryButton()}
          {this._renderVisitConfirmationButton()}
        </FooterTab>
      </Footer>
    );
  }
}

export default FooterDoctor;

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
    height: "100%"
  }
});
