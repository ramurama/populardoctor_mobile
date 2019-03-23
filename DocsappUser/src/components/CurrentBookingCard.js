import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import { SECONDARY } from "../config/colors";
import Token from "./Token";
import { FONT_S, FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_THIN, FONT_WEIGHT_MEDIUM } from "../config/fontWeight";

const propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  tokenNumber: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  bookingId: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

class CurrentBookingCard extends Component {
  constructor(props) {
    super(props);
  }

  _rendervisitorName(name) {
    return (
      <Text
        style={styles.visitorNameStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    );
  }

  _renderNumber(number) {
    return (
      <Text
        style={styles.mobileNumberStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {number}
      </Text>
    );
  }

  _renderToken(tokenNumber) {
    return (
      <Token
        isCurrent={true}
        number={tokenNumber}
        dimension={"default"}
        type={this.props.tokenType}
      />
    );
  }

  _renderCaseInfoContainer(name, number, tokenNumber) {
    return (
      <View style={styles.caseStyle}>
        <View style={styles.iconContainerStyle}>
          <Icon style={[styles.iconStyle]} name="person" type="MaterialIcons" />
        </View>
        <View style={styles.caseInfoStyle}>
          {this._rendervisitorName(name)}
          {this._renderNumber(number)}
        </View>
        {this._renderToken(tokenNumber)}
      </View>
    );
  }

  render() {
    const { name, number, tokenNumber, onPress, bookingId } = this.props;
    return (
      <TouchableOpacity
        style={styles.containerStyle}
        onPress={() => onPress(bookingId)}
      >
        {this._renderCaseInfoContainer(name, number, tokenNumber)}
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
  iconContainerStyle: {
    width: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  caseStyle: {
    flexDirection: "row"
  },
  caseInfoStyle: {
    flex: 2,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: "space-around",
    alignItems: "flex-start"
  },
  visitorNameStyle: {
    fontSize: FONT_L,
    color: SECONDARY,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  mobileNumberStyle: {
    fontSize: FONT_S,
    color: "grey",
    fontWeight: FONT_WEIGHT_THIN
  }
});

export default CurrentBookingCard;
