import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Text } from "native-base";
import PropTypes from "prop-types";
import { BACKGROUND_DARK_GREY } from "../config/colors";
import { FONT_WEIGHT_MEDIUM } from "../config/fontWeight";

const propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

class LocationCard extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View style={styles.mainView}>
          <View style={styles.iconView}>
            <Icon name="location" type="EvilIcons" style={styles.iconStyle} />
          </View>
          <View style={styles.locationTextView}>
            <Text style={styles.textStyle}>{this.props.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default LocationCard;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eeeeee"
  },
  iconView: { flex: 1 },
  locationTextView: {
    flex: 4,
    justifyContent: "center"
  },
  textStyle: {
    color: BACKGROUND_DARK_GREY,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  iconStyle: {
    color: BACKGROUND_DARK_GREY
  }
});
