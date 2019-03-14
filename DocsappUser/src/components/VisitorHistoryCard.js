import React, { Component } from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import { SECONDARY } from "../config/colors";
import { FONT_M, FONT_XS, FONT_XXS, FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_THIN, FONT_WEIGHT_MEDIUM } from "../config/fontWeight";

const propTypes = {
  visitorName: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  hospitalName: PropTypes.string.isRequired,
  hospitalAddress: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

class VisitorHistoryCard extends Component {
  _rendervisitorName(visitorName) {
    return (
      <Text
        style={styles.visitorNameStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {visitorName}
      </Text>
    );
  }

  _rendernumber(mobile) {
    return (
      <Text style={styles.numberStyle} numberOfLines={1} ellipsizeMode="tail">
        {mobile}
      </Text>
    );
  }

  _renderHospitalName(hospitalName) {
    return (
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[styles.hospitalNameStyle]}
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

  _renderBookingDate(bookingDate) {
    return (
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.dateTimeStyle}>
        {bookingDate}
      </Text>
    );
  }

  _renderDateTimeContainer(bookingDate) {
    return (
      <View style={styles.dateContainerStyle}>
        <Icon
          style={[styles.iconStyle]}
          name="date-range"
          type="MaterialIcons"
        />
        {this._renderBookingDate(bookingDate)}
      </View>
    );
  }

  _renderHospitalInfoContainer(hospitalName, hospitalAddress, bookingDate) {
    return (
      <View style={styles.hospitalStyle}>
        <View style={styles.imageContainerStyle}>
          <Icon
            style={[styles.iconStyle]}
            name="hospital"
            type="FontAwesome5"
          />
        </View>
        <View style={styles.hospitalInfoStyle}>
          {this._renderHospitalName(hospitalName)}
          {this._renderHospitalAddress(hospitalAddress)}
        </View>
        {this._renderDateTimeContainer(bookingDate)}
      </View>
    );
  }

  _renderCaseInfoContainer(visitorName, mobile) {
    return (
      <View style={styles.caseStyle}>
        <View style={styles.imageContainerStyle}>
          <Icon style={[styles.iconStyle]} name="person" type="MaterialIcons" />
        </View>
        <View style={styles.caseInfoStyle}>
          {this._rendervisitorName(visitorName)}
          {this._rendernumber(mobile)}
        </View>
      </View>
    );
  }

  render() {
    const {
      visitorName,
      mobile,
      hospitalName,
      hospitalAddress,
      bookingDate,
      onPress
    } = this.props;

    return (
      <TouchableOpacity style={styles.containerStyle} onPress={onPress}>
        {this._renderCaseInfoContainer(visitorName, mobile)}
        {this._renderHospitalInfoContainer(
          hospitalName,
          hospitalAddress,
          bookingDate
        )}
        {/* {this._renderDateTimeContainer(bookingDate)} */}
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
    margin: 10,
    marginTop: 6,
    marginBottom: 6,
    elevation: 4
  },
  iconStyle: {
    fontSize: FONT_L,
    color: SECONDARY
  },
  imageContainerStyle: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  caseStyle: {
    flexDirection: "row",
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: "lightgrey"
  },
  caseInfoStyle: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "space-around",
    alignItems: "flex-start",
    textAlign: "left"
  },
  visitorNameStyle: {
    fontSize: FONT_M,
    color: SECONDARY,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  numberStyle: {
    fontSize: FONT_XS,
    color: "grey",
    fontWeight: FONT_WEIGHT_THIN
  },
  hospitalStyle: {
    flexDirection: "row",
    paddingTop: 8,
    justifyContent: "center"
  },
  hospitalInfoStyle: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingLeft: 8
  },
  hospitalNameStyle: {
    fontSize: FONT_M,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: SECONDARY
  },
  hospitalAddressStyle: {
    fontSize: FONT_XS,
    color: "grey",
    fontWeight: FONT_WEIGHT_THIN
  },
  dateContainerStyle: {
    paddingLeft: 8,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  dateTimeStyle: {
    fontSize: FONT_XXS,
    color: "black",
    fontWeight: FONT_WEIGHT_THIN,
    marginLeft: 8,
    marginRight: 8
  }
});

export default VisitorHistoryCard;
