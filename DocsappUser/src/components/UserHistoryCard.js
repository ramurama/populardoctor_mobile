import React, { Component } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import { SECONDARY, FASTTRACK_COLOR, PREMIUM_COLOR } from "../config/colors";
import Token from "./Token";
import { FONT_M, FONT_S, FONT_XXS, FONT_L, FONT_XL } from "../config/fontSize";
import {
  FONT_WEIGHT_THIN,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_BOLD
} from "../config/fontWeight";
import { TOKEN_BOOKED, TOKEN_CANCELLED } from "../constants/tokenStatus";

const propTypes = {
  imageURL: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  otpVisible: PropTypes.bool.isRequired,
  otp: PropTypes.string.isRequired,
  hospitalName: PropTypes.string.isRequired,
  hospitalAddress: PropTypes.string.isRequired,
  tokenNumber: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  status: PropTypes.string.isRequired
};

class UserHistoryCard extends Component {
  _renderDoctorName(doctorName) {
    return (
      <Text
        style={styles.doctorNameStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {"Dr. " + doctorName}
      </Text>
    );
  }

  _renderSpecialization(specialization) {
    return (
      <Text
        style={styles.specializationStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {specialization}
      </Text>
    );
  }

  _renderOtpContent(otp) {
    return (
      <View style={styles.otpContainerStyle}>
        <Text style={styles.otpTitleStyle}>OTP</Text>
        <Text style={styles.otpStyle}>{otp}</Text>
      </View>
    );
  }

  _renderHospitalName(hospitalName) {
    const colorStyle = this.props.isCurrent
      ? styles.currentColorStyle
      : styles.previousColorStyle;
    return (
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[styles.hospitalNameStyle, colorStyle]}
      >
        {hospitalName}
      </Text>
    );
  }

  _renderHospitalAddress(hospitalAddress) {
    return (
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.hospitalAddressStyle}
      >
        {hospitalAddress}
      </Text>
    );
  }

  _renderToken(tokenNumber) {
    return (
      <Token
        number={tokenNumber}
        isCurrent={this.props.isCurrent}
        dimension={"default"}
        type={this.props.tokenType}
      />
    );
  }

  _renderBookingDate(bookingDate) {
    return (
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.dateTimeStyle}>
        {bookingDate}
      </Text>
    );
  }

  _renderBookingTime(bookingTime) {
    return (
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.dateTimeStyle}>
        {bookingTime}
      </Text>
    );
  }

  _renderDateTimeContainer(bookingDate, bookingTime) {
    const isFastTrack = this.props.tokenNumber === 0;
    const colorStyle = this.props.isCurrent
      ? styles.currentColorStyle
      : styles.previousColorStyle;
    return (
      <View style={styles.dateContainerStyle}>
        <Icon
          style={[styles.iconStyle, colorStyle]}
          name="date-range"
          type="MaterialIcons"
        />
        {this._renderBookingDate(bookingDate)}
        {!isFastTrack && (
          <Icon
            style={[styles.iconStyle, colorStyle]}
            name="watch-later"
            type="MaterialIcons"
          />
        )}
        {!isFastTrack && this._renderBookingTime(bookingTime)}
      </View>
    );
  }

  _renderHospitalInfoContainer(hospitalName, hospitalAddress, tokenNumber) {
    return (
      <View style={styles.hospitalStyle}>
        <View style={styles.hospitalInfoStyle}>
          {this._renderHospitalName(hospitalName)}
          {this._renderHospitalAddress(hospitalAddress)}
        </View>
        {this._renderToken(tokenNumber)}
      </View>
    );
  }

  _renderStatusIndicator() {
    const { status } = this.props;
    let displayStatus = "";
    let statusStyle = {};
    switch (status) {
      case TOKEN_BOOKED:
        displayStatus = "EXP";
        statusStyle = { color: "#fb8c00" };
        break;
      case TOKEN_CANCELLED:
        displayStatus = "CAN";
        statusStyle = { color: "#ff1744" };
        break;
    }
    return (
      <View style={[styles.statusContainerStyle]}>
        <Text
          style={[
            { fontWeight: FONT_WEIGHT_MEDIUM, fontSize: FONT_M },
            statusStyle
          ]}
        >
          {displayStatus}
        </Text>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  _renderDoctorInfoContainer(
    imageURL,
    doctorName,
    specialization,
    otpVisible,
    otp
  ) {
    return (
      <View style={styles.doctorStyle}>
        <View style={styles.imageContainerStyle}>
          <Image style={styles.imageStyle} source={{ uri: imageURL }} />
        </View>
        <View style={styles.doctorInfoStyle}>
          {this._renderDoctorName(doctorName)}
          {this._renderSpecialization(specialization)}
        </View>

        {otpVisible && this._renderOtpContent(otp)}
        {!otpVisible && this._renderStatusIndicator()}
      </View>
    );
  }

  render() {
    const {
      doctorName,
      specialization,
      otp,
      imageURL,
      hospitalName,
      hospitalAddress,
      bookingDate,
      bookingTime,
      tokenNumber,
      otpVisible,
      onPress
    } = this.props;

    return (
      <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
        {this._renderDoctorInfoContainer(
          imageURL,
          doctorName,
          specialization,
          otpVisible,
          otp
        )}
        {this._renderHospitalInfoContainer(
          hospitalName,
          hospitalAddress,
          tokenNumber
        )}
        {this._renderDateTimeContainer(bookingDate, bookingTime)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "column",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 10,
    elevation: 4
  },
  iconStyle: {
    fontSize: FONT_L
  },
  imageContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  doctorStyle: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "lightgrey"
  },
  imageStyle: {
    height: 60,
    width: 60,
    borderRadius: 12
  },
  doctorInfoStyle: {
    flex: 2,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  doctorNameStyle: {
    fontSize: FONT_M,
    color: "black",
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  specializationStyle: {
    fontSize: FONT_M,
    color: "grey",
    fontWeight: FONT_WEIGHT_THIN
  },
  otpContainerStyle: {
    flex: 1,
    paddingTop: 8,
    marginLeft: 8,
    alignItems: "center"
  },
  otpStyle: {
    color: SECONDARY,
    fontSize: FONT_S,
    width: 50,
    paddingLeft: 11
  },
  otpTitleStyle: {
    color: "grey",
    paddingLeft: 2
  },
  hospitalStyle: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "flex-end"
  },
  hospitalInfoStyle: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 5
  },
  hospitalNameStyle: {
    fontSize: FONT_M,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  hospitalNameStyle: {
    fontSize: FONT_M,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  hospitalAddressStyle: {
    fontSize: FONT_XXS,
    color: "grey",
    fontWeight: FONT_WEIGHT_THIN
  },
  dateContainerStyle: {
    paddingLeft: 8,
    flexDirection: "row",
    alignItems: "center"
  },
  dateTimeStyle: {
    fontSize: FONT_XXS,
    color: "black",
    fontWeight: FONT_WEIGHT_THIN,
    marginLeft: 8,
    marginRight: 8
  },
  currentColorStyle: {
    color: SECONDARY,
    borderColor: SECONDARY
  },
  previousColorStyle: {
    color: "grey",
    borderColor: "grey"
  },
  statusContainerStyle: {
    // flex: 1,
    padding: 8,
    // marginLeft: 8,
    alignItems: "center"
  }
});

export default UserHistoryCard;
