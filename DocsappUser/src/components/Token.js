import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SECONDARY, PREMIUM_COLOR } from "../config/colors";
import { FONT_XXS, FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_XXBOLD } from "../config/fontWeight";
import { isStringsEqual } from "../commons/utils";
import { TOKEN_PREMIUM } from "../constants/tokenTypes";

const styles = StyleSheet.create({
  tokenStyle: {
    flexDirection: "column",
    borderWidth: 2,
    marginLeft: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60
  },
  tokenTitleStyle: {
    padding: 8,
    paddingBottom: 4,
    fontSize: FONT_XXS
  },
  tokenValueStyle: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_XXBOLD,
    padding: 8,
    paddingTop: 0
  },
  currentRegularColorStyle: {
    color: SECONDARY,
    borderColor: SECONDARY
  },
  currentPremiumColorStyle: {
    color: PREMIUM_COLOR,
    borderColor: PREMIUM_COLOR
  },
  previousColorStyle: {
    color: "grey",
    borderColor: "grey"
  }
});
class Token extends React.Component {
  _renderEmptyToken() {
    return (
      <View style={[styles.tokenStyle, { borderWidth: 0 }]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.tokenTitleStyle]}
        />
        <Text style={[styles.tokenValueStyle]} />
      </View>
    );
  }

  _renderToken() {
    const { number, isCurrent, type } = this.props;

    const currentColorStyle = isStringsEqual(type, TOKEN_PREMIUM)
      ? styles.currentPremiumColorStyle
      : styles.currentRegularColorStyle;
    const colorStyle = isCurrent
      ? currentColorStyle
      : styles.previousColorStyle;
    return (
      <View style={[styles.tokenStyle, colorStyle]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.tokenTitleStyle, colorStyle]}
        >
          Token
        </Text>
        <Text style={[styles.tokenValueStyle, colorStyle]}>{number}</Text>
      </View>
    );
  }

  render() {
    if (this.props.number === 0) {
      return this._renderEmptyToken();
    } else {
      return this._renderToken();
    }
  }
}
export default Token;
