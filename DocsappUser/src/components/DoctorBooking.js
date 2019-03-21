import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Icon } from "native-base";
import {
  SECONDARY,
  PRIMARY,
  HELPER_TEXT_COLOR,
  BACKGROUND_2,
  ON_PRIMARY,
  BACKGROUND_1
} from "../config/colors";
import PropTypes from "prop-types";
import Chip from "../components/Chip";
import { FONT_WEIGHT_MEDIUM } from "../config/fontWeight";

const propTypes = {
  bookingDate: PropTypes.string.isRequired,
  bookingId: PropTypes.string,
  visitorName: PropTypes.string.isRequired,
  visiorMobile: PropTypes.string.isRequired,
  tokenNumber: PropTypes.string.isRequired,
  tokenTime: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  hospitalName: PropTypes.string.isRequired
};

const SCREEN_W = Dimensions.get("window").width;

class DoctorBooking extends React.Component {
  _renderDataContent(contentTitle, contentValue) {
    return (
      <View style={styles.bookingItemList}>
        <Text style={styles.primaryTextStyle}>{contentTitle}</Text>
        <Text
          style={[{ paddingLeft: 10 }, styles.secondaryTextStyle]}
          numberOfLines={4}
          ellipsizeMode="tail"
        >
          {":   " + contentValue}
        </Text>
      </View>
    );
  }

  _renderBookingId(bookingId) {
    return (
      <View style={styles.bookingItemList}>
        <Text style={styles.primaryTextStyle}>Booking ID</Text>
        <View style={styles.bookingIdSubView}>
          <Text style={styles.bookingIdText}>{":   "}</Text>
          <Chip title={bookingId} />
        </View>
      </View>
    );
  }

  _renderBookingDetails() {
    const {
      bookingDate,
      bookingId,
      tokenNumber,
      tokenTime,
      tokenType,
      visitorName,
      visitorMobile,
      hospitalName
    } = this.props;
    return (
      <View style={{ flexDirection: "column", paddingLeft: 32 }}>
        {this._renderBookingId(bookingId)}
        {this._renderDataContent("Appointment Date", bookingDate)}
        {tokenNumber !== 0 &&
          this._renderDataContent("Token Number", tokenNumber)}
        {this._renderDataContent("Token Type", tokenType)}
        {tokenNumber !== 0 && this._renderDataContent("Token Time", tokenTime)}
        {this._renderDataContent("Visitor Name", visitorName)}
        {this._renderDataContent("Visitor Mobile", visitorMobile)}
        {this._renderDataContent("Hospital", hospitalName)}
      </View>
    );
  }

  render() {
    return <View style={styles.mainView}>{this._renderBookingDetails()}</View>;
  }
}
export default DoctorBooking;

const styles = StyleSheet.create({
  mainView: {
    paddingTop: 20,
    paddingBottom: 20
  },
  bookingItemList: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingBottom: 16
  },
  secondaryTextStyle: {
    flex: 2,
    fontSize: SCREEN_W * 0.045,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: HELPER_TEXT_COLOR
  },
  primaryTextStyle: {
    flex: 1,
    fontSize: SCREEN_W * 0.045,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: SECONDARY
  },
  bookingIdText: {
    fontSize: SCREEN_W * 0.045,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: HELPER_TEXT_COLOR
  },
  bookingIdSubView: {
    flex: 2,
    paddingLeft: 10,
    flexDirection: "row"
  }
});
