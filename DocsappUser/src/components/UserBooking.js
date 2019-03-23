import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";
import {
  SECONDARY,
  PRIMARY,
  HELPER_TEXT_COLOR,
  BACKGROUND_2,
  ON_PRIMARY,
  BACKGROUND_1,
  WHITE
} from "../config/colors";
import { Icon } from "native-base";
import { Divider } from "react-native-elements";
import PropTypes from "prop-types";
import QRCode from "react-native-qrcode";
import Chip from "../components/Chip";
import { TOKEN_FASTTRACK } from "../constants/tokenTypes";
import { FONT_M, FONT_L, FONT_XL } from "../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";

const propTypes = {
  hospitalName: PropTypes.string.isRequired,
  hospitalAddress: PropTypes.string.isRequired,
  bookingDay: PropTypes.string.isRequired,
  availableTime: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  enableQR: PropTypes.bool.isRequired,
  bookingId: PropTypes.string,
  showBookingId: PropTypes.bool.isRequired
};

class UserBooking extends React.Component {
  _isFasttrackTokenType() {
    return this.props.tokenType === TOKEN_FASTTRACK;
  }
  _renderDoctorInfo() {
    const { doctorName, specialization } = this.props;
    return (
      <View style={styles.listItems}>
        <Icon name="person" style={styles.iconStyle} type="MaterialIcons" />

        <View
          style={{ flexDirection: "column", justifyContent: "space-around" }}
        >
          <Text
            style={styles.primaryTextStyle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {doctorName}
          </Text>
          <Text
            style={styles.secondaryTextStyle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {specialization}
          </Text>
        </View>
      </View>
    );
  }

  _renderHospitalInfo() {
    const { hospitalName, hospitalAddress } = this.props;
    return (
      <View style={styles.listItems}>
        <Icon name="hospital" style={styles.iconStyle} type="FontAwesome5" />
        <View style={styles.listText}>
          <Text
            style={styles.primaryTextStyle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {hospitalName}
          </Text>
          <Text
            style={styles.secondaryTextStyle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {hospitalAddress}
          </Text>
        </View>
      </View>
    );
  }

  _renderDateTimeInfo() {
    const { bookingDay, availableTime } = this.props;
    return (
      <View style={styles.listItems}>
        <Icon
          name="calendar-clock"
          style={styles.iconStyle}
          type="MaterialCommunityIcons"
        />
        <View style={styles.listText}>
          <Text
            style={styles.primaryTextStyle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {bookingDay}
          </Text>
          <Text
            style={styles.secondaryTextStyle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {availableTime}
          </Text>
        </View>
      </View>
    );
  }
  _renderDivider() {
    return (
      <Divider style={{ backgroundColor: HELPER_TEXT_COLOR, margin: 24 }} />
    );
  }

  _renderBookingDetails() {
    const { tokenNumber, bookingTime, bookingId } = this.props;
    return (
      <View>
        <Text style={styles.headerStyle}>Booking details</Text>
        <View style={{ flexDirection: "column", paddingLeft: 32 }}>
          {this.props.showBookingId && (
            <View style={styles.bookingItemList}>
              <Text style={styles.primaryTextStyle}>Booking Id </Text>
              <Text
                style={[{ paddingLeft: 12 }, styles.secondaryTextStyle]}
              >{` :  `}</Text>
              <Chip title={bookingId} />
            </View>
          )}
          <View style={styles.bookingItemList}>
            <Text style={styles.primaryTextStyle}>Token type</Text>
            <Text
              style={[{ paddingLeft: 12 }, styles.secondaryTextStyle]}
            >{` :  ${this.props.tokenType}`}</Text>
          </View>
          {!this._isFasttrackTokenType() && (
            <View>
              <View style={styles.bookingItemList}>
                <Text style={styles.primaryTextStyle}>Token No </Text>
                <Text
                  style={[{ paddingLeft: 22 }, styles.secondaryTextStyle]}
                >{` :  ${tokenNumber}`}</Text>
              </View>
              <View style={styles.bookingItemList}>
                <Text style={styles.primaryTextStyle}>Token Time</Text>
                <Text
                  style={[{ paddingLeft: 10 }, styles.secondaryTextStyle]}
                >{` :  ${bookingTime}`}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  _renderQRView() {
    const { bookingId } = this.props;
    return (
      <View style={styles.qrView}>
        <QRCode
          value={`${bookingId}`}
          size={100}
          bgColor="transparent"
          fgColor={WHITE}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Text style={styles.headerStyle}>Doctor details</Text>
        <View style={styles.mainBody}>
          {this._renderDoctorInfo()}
          {this._renderHospitalInfo()}
          {this._renderDateTimeInfo()}
        </View>
        {/* {this._renderDivider()} */}
        {this.props.enableQR && this._renderQRView()}
        {this._renderBookingDetails()}
      </View>
    );
  }
}
export default UserBooking;

const styles = StyleSheet.create({
  bookText: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_BOLD,
    padding: 10,
    color: PRIMARY
  },
  mainBody: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 24
  },
  listItems: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingBottom: 16
  },
  bookingItemList: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingBottom: 16
  },
  listText: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  iconStyle: {
    color: SECONDARY,
    padding: 8,
    marginRight: 8,
    fontSize: FONT_XL
  },
  hospitalTimeIconStyle: {
    fontSize: 30
  },
  secondaryTextStyle: {
    fontSize: FONT_M,
    color: HELPER_TEXT_COLOR
  },
  primaryTextStyle: {
    fontSize: FONT_L,
    color: SECONDARY
  },
  headerStyle: {
    fontSize: FONT_M,
    padding: 24,
    color: HELPER_TEXT_COLOR
  },
  bookingInfoText: {
    fontSize: FONT_M,
    color: HELPER_TEXT_COLOR
  },
  tokenTimeStyle: {
    fontSize: FONT_M,
    padding: 24,
    paddingLeft: 15,
    color: SECONDARY
  },
  qrView: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "center"
  },
  chipStyle: {
    fontSize: FONT_M,
    color: WHITE
  }
});
