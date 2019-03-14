import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SECONDARY, PRIMARY } from "../config/colors";
import PropTypes from "prop-types";
import { FONT_WEIGHT_THIN, FONT_WEIGHT_BOLD } from "../config/fontWeight";

const propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired
};

const SCREEN_W = Dimensions.get("window").width;

class RatingCard extends React.Component {
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{this.props.title}</Text>
        </View>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>{this.props.rating}</Text>
        </View>
      </View>
    );
  }
}
export default RatingCard;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column",
    padding: 20,
    margin: 15,
    borderRadius: 20,
    height: SCREEN_W * 0.4,
    width: SCREEN_W * 0.4,
    shadowOffset: { height: 4, width: 4 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    elevation: 10,
    backgroundColor: PRIMARY
  },
  titleView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  titleText: {
    color: SECONDARY,
    fontWeight: FONT_WEIGHT_BOLD,
    fontSize: SCREEN_W * 0.06
  },
  ratingView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center"
  },
  ratingText: {
    color: SECONDARY,
    fontWeight: FONT_WEIGHT_THIN,
    fontSize: SCREEN_W * 0.17
  }
});
