import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import { Text } from "native-base";
import PropTypes from "prop-types";
import { ON_PRIMARY } from "../config/colors";
import { FONT_WEIGHT_THIN } from "../config/fontWeight";

const propTypes = {
  image: PropTypes.string.isRequired,
  specializationName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const SCREEN_H = Dimensions.get("window").height;
const SCREEN_W = Dimensions.get("window").width;

class Specialization extends React.Component {
  _renderSpecializationImage(image) {
    return (
      <View style={{ alignItems: "center" }}>
        <Image style={styles.image} resizeMode={"contain"} source={image} />
      </View>
    );
  }

  _renderSpecializationName(specializationName) {
    return (
      <View style={styles.specializationView}>
        <Text
          style={styles.specializationNameText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {specializationName}
        </Text>
      </View>
    );
  }

  render() {
    const { onPress, image, specializationName } = this.props;
    return (
      <View style={styles.mainView}>
        <TouchableOpacity onPress={onPress}>
          {this._renderSpecializationImage(image)}
          {this._renderSpecializationName(specializationName)}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column",
    width: SCREEN_W * 0.33,
    alignItems: "center",
    marginLeft: -4,
    justifyContent: "center"
  },
  image: {
    marginTop: 5,
    height: SCREEN_W * 0.2,
    width: SCREEN_W * 0.2
  },
  specializationNameText: {
    fontSize: SCREEN_W * 0.04,
    fontWeight: FONT_WEIGHT_THIN,
    marginBottom: 5,
    textAlign: "center",
    color: ON_PRIMARY
  },
  specializationView: {
    marginTop: 5
  }
});

export default Specialization;
