import React from "react";
import { Animated, StyleSheet, Text, Easing } from "react-native";
import PropTypes from "prop-types";
import { PRIMARY, BACKGROUND_DARK_GREY } from "../config/colors";
import { FONT_S } from "../config/fontSize";

const propTypes = {
  timeRange: PropTypes.string.isRequired
};

class TokenTimePanel extends React.Component {
  componentDidMount() {
    this._animateTokenTimePanel();
  }

  componentDidUpdate() {
    this._animateTokenTimePanel();
  }

  _animateTokenTimePanel() {
    this.opacity = new Animated.Value(0);
    Animated.timing(this.opacity, {
      toValue: 0.8,
      duration: 2000,
      easing: Easing.ease
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.tokenTimeView, { opacity: this.opacity }]}>
        <Text style={styles.tokenTimeStyle}>{this.props.timeRange}</Text>
      </Animated.View>
    );
  }
}

export default TokenTimePanel;

const styles = StyleSheet.create({
  tokenTimeStyle: {
    alignSelf: "center",
    paddingBottom: 4,
    paddingTop: 4,
    color: PRIMARY,
    fontSize: FONT_S
  },
  tokenTimeView: {
    backgroundColor: BACKGROUND_DARK_GREY,
    opacity: 0.8
  }
});
