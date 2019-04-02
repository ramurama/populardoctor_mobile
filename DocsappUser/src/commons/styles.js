import { StyleSheet, Platform } from "react-native";
import {
  ON_PRIMARY,
  PRIMARY,
  SECONDARY,
  SHADOW_COLOR,
  BACKGROUND_2
} from "../config/colors";
import { Dimensions } from "react-native";
import { FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";

export default (commonStyles = StyleSheet.create({
  headerBody: {
    flex: 3
  },
  headerNavigatorTitle: {
    width: Dimensions.get("window").width,
    color: ON_PRIMARY
  },
  containerBg: {
    backgroundColor: PRIMARY
  },
  contentBg: {
    backgroundColor: BACKGROUND_2
  },
  shadow: {
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 3
  },
  headerDefault: {
    backgroundColor: SECONDARY,
    color: PRIMARY,
    shadowColor: SHADOW_COLOR,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 3
  },
  fontFamily: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Arial"
  },
  headerTitleStyle: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
    color: PRIMARY,
    fontSize: 18,
    fontWeight: "800"
  },
  footerButtonStyle: {
    backgroundColor: SECONDARY
  },
  footerButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  footerButtonText: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_BOLD,
    padding: 10,
    color: PRIMARY
  }
}));
