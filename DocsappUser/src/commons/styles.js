import { StyleSheet, Platform } from "react-native";
import {
  ON_PRIMARY,
  PRIMARY,
  SECONDARY,
  SHADOW_COLOR,
  BACKGROUND_2
} from "../config/colors";
import { Dimensions } from "react-native";

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
  }
}));
