import React, { Component } from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "native-base";
import {
  SECONDARY,
  WHITE,
  FASTTRACK,
  FASTTRACK_COLOR,
  DISABLED_GREY
} from "../config/colors";
import {
  TOKEN_REGULAR,
  TOKEN_PREMIUM,
  TOKEN_FASTTRACK
} from "../constants/tokenTypes";
import { FONT_WEIGHT_MEDIUM, FONT_WEIGHT_XXBOLD } from "../config/fontWeight";

const SCREEN_W = Dimensions.get("window").width;

const propTypes = {
  tokenNumber: PropTypes.string.isRequired,
  tokenType: PropTypes.string.isRequired,
  tokenTime: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired
};

class TouchableToken extends Component {
  render() {
    const {
      tokenNumber,
      isDisabled,
      isSelected,
      tokenType,
      tokenTime
    } = this.props;
    let selectedStyle = styles.notSelected;
    let textStyle = {};

    let borderStyle = {};

    if (isDisabled) {
      textStyle = styles.textDisabled;
      selectedStyle = styles.disabledToken;
    } else {
      if (tokenType === TOKEN_REGULAR) {
        borderStyle = styles.borderRegular;
        if (isSelected) {
          textStyle = styles.textSelected;
          selectedStyle = styles.selectedRegular;
        } else {
          textStyle = styles.textNotSelectedRegular;
        }
      } else if (tokenType === TOKEN_PREMIUM) {
        borderStyle = styles.borderPremium;
        if (isSelected) {
          textStyle = styles.textSelected;
          selectedStyle = styles.selectedPremium;
        } else {
          textStyle = styles.textNotSelectedPremium;
        }
      } else if (tokenType === TOKEN_FASTTRACK) {
        borderStyle = styles.borderFastTrack;
        if (isSelected) {
          textStyle = styles.textSelected;
          selectedStyle = styles.selectedFastTrack;
        } else {
          textStyle = styles.textNotSelectedFastTrack;
        }
      }
    }
    return (
      <TouchableOpacity
        disabled={isDisabled}
        style={[styles.tokenStyle, selectedStyle, borderStyle]}
        onPress={() =>
          this.props.onSelection(tokenNumber, tokenType, tokenTime)
        }
      >
        {tokenType !== TOKEN_FASTTRACK && (
          <Text style={[styles.tokenText, textStyle]}>Token</Text>
        )}
        {tokenType === TOKEN_FASTTRACK && (
          <Text
            style={[styles.tokenText, textStyle]}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            FastTrack
          </Text>
        )}

        {tokenType !== TOKEN_FASTTRACK && (
          <Text style={[styles.tokenNumber, textStyle]}>{tokenNumber}</Text>
        )}
        {tokenType === TOKEN_FASTTRACK && (
          <Icon
            name="clock-fast"
            style={[styles.tokenText, textStyle]}
            type="MaterialCommunityIcons"
          />
        )}
      </TouchableOpacity>
    );
  }
}
export default TouchableToken;

const styles = StyleSheet.create({
  tokenStyle: {
    width: SCREEN_W * 0.2,
    height: SCREEN_W * 0.2,
    borderRadius: 12,
    borderWidth: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15
  },
  borderRegular: {
    borderColor: SECONDARY
  },
  borderPremium: {
    borderColor: SECONDARY
  },
  borderFastTrack: {
    borderColor: FASTTRACK_COLOR
  },
  notSelected: {
    backgroundColor: WHITE
  },
  selectedRegular: {
    backgroundColor: SECONDARY
  },
  selectedPremium: {
    backgroundColor: SECONDARY
  },
  selectedFastTrack: {
    backgroundColor: FASTTRACK_COLOR
  },
  textSelected: {
    color: WHITE
  },
  textNotSelectedRegular: {
    color: SECONDARY
  },
  textNotSelectedPremium: {
    color: SECONDARY
  },
  textNotSelectedFastTrack: {
    color: FASTTRACK_COLOR
  },
  textDisabled: {
    color: WHITE
  },
  disabledToken: {
    backgroundColor: DISABLED_GREY,
    borderColor: DISABLED_GREY
  },
  tokenTextRegular: {
    fontSize: SCREEN_W * 0.04,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  tokenTextPremium: {
    fontSize: SCREEN_W * 0.04,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  tokenTextFastTrack: {
    fontSize: SCREEN_W * 0.04,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  tokenNumber: {
    fontSize: SCREEN_W * 0.07,
    fontWeight: FONT_WEIGHT_XXBOLD
  }
});
