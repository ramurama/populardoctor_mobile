import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Icon } from "native-base";
import {
  SECONDARY,
  HELPER_TEXT_COLOR,
  BACKGROUND_1,
  BACKGROUND_2
} from "../config/colors";
import * as Animatable from "react-native-animatable";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";

const SCREEN_W = Dimensions.get("window").width;

function VisitConfirmedIcon() {
  return (
    <Animatable.View
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
      style={styles.mainView}
    >
      <Icon name="checkcircleo" type="AntDesign" style={styles.iconStyle} />
      <Text style={styles.textStyle}>Visit Confirmed</Text>
    </Animatable.View>
  );
}

export default VisitConfirmedIcon;

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: SCREEN_W * 0.25,
    color: SECONDARY,
    alignSelf: "center"
  },
  textStyle: {
    alignSelf: "center",
    color: HELPER_TEXT_COLOR,
    fontSize: SCREEN_W * 0.06,
    fontWeight: FONT_WEIGHT_BOLD
  },
  mainView: {
    flexDirection: "column",
    paddingTop: 20,
    backgroundColor: BACKGROUND_2,
    paddingBottom: 10
  }
});
