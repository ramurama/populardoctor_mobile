import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "native-base";
import { SECONDARY, PRIMARY } from "../config/colors";
import PropTypes from "prop-types";
import { FONT_M } from "../config/fontSize";
import { FONT_WEIGHT_XBOLD } from "../config/fontWeight";

const propTypes = {
  chipStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  title: PropTypes.string.isRequired
};

class Chip extends React.PureComponent {
  render() {
    const { chipStyle, titleStyle, title } = this.props;

    let totalViewStyle = [styles.mainView];
    let totalTitleStyle = [styles.title];

    if (chipStyle !== undefined) {
      totalViewStyle.push(chipStyle);
    }
    if (titleStyle !== undefined) {
      totalTitleStyle.push(titleStyle);
    }
    return (
      <View style={totalViewStyle}>
        <Text style={totalTitleStyle}>{title}</Text>
      </View>
    );
  }
}

export default Chip;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: SECONDARY,
    borderRadius: 25,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    alignSelf: "center",
    color: PRIMARY,
    fontSize: FONT_M,
    fontWeight: FONT_WEIGHT_XBOLD
  }
});
