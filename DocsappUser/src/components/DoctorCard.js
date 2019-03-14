import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import {
  STATUS_AVAILABLE_COLOR,
  STATUS_NOT_AVAILABLE_COLOR
} from "../config/colors";
import { FONT_S, FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_THIN } from "../config/fontWeight";

const propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  imageURL: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  hospitalName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

class DoctorCard extends React.Component {
  _renderAvatarImage(imageURL) {
    return (
      <View>
        <Image style={styles.imageStyle} source={{ uri: imageURL }} />
      </View>
    );
  }

  _renderDoctorNameText(doctorName) {
    return (
      <Text
        style={styles.doctorNameStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {"Dr. " + doctorName}
      </Text>
    );
  }

  _renderSpecializationText(specialization) {
    return <Text style={styles.specializationStyle}>{specialization}</Text>;
  }

  _renderDoctorInfoContainer(doctorName, specialization) {
    return (
      <View style={styles.infoContainerStyle}>
        {this._renderDoctorNameText(doctorName)}
        {this._renderSpecializationText(specialization)}
      </View>
    );
  }

  _renderFavIcon(isFavorite) {
    return (
      <View style={styles.favContainerStyle}>
        <Icon
          name="heart"
          style={styles.favIconStyle}
          type="MaterialCommunityIcons"
        />
      </View>
    );
  }

  _renderStatusIndicator(statusAvailable) {
    return <View style={[styles.statusIndicatorStyle, statusAvailable]} />;
  }

  _renderHospitalName(hospitalName) {
    return (
      <Text
        style={styles.hospitalNameStyle}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {hospitalName}
      </Text>
    );
  }

  _renderTopContainer(doctorName, specialization, isFavorite) {
    return (
      <View style={styles.topContainerStyle}>
        {this._renderDoctorInfoContainer(doctorName, specialization)}
        {isFavorite && this._renderFavIcon(isFavorite)}
      </View>
    );
  }

  _renderBottomContainer(statusAvailable, hospitalName) {
    return (
      <View style={styles.bottomContainer}>
        {this.props.isAvailable !== undefined &&
          this._renderStatusIndicator(statusAvailable)}
        {this._renderHospitalName(hospitalName)}
      </View>
    );
  }

  render() {
    const {
      isAvailable,
      isFavorite,
      imageURL,
      doctorName,
      specialization,
      hospitalName,
      onPress
    } = this.props;

    let statusAvailable = styles.statusNotAvailableStyle;
    if (isAvailable) {
      statusAvailable = styles.statusAvailableStyle;
    }

    return (
      <TouchableOpacity onPress={onPress} style={styles.containerStyle}>
        {this._renderAvatarImage(imageURL)}
        <View style={styles.commonContainerStyle}>
          {this._renderTopContainer(doctorName, specialization, isFavorite)}
          {this._renderBottomContainer(statusAvailable, hospitalName)}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    padding: 12,
    margin: 3,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    flex: 1
  },
  imageStyle: {
    height: 75,
    width: 75,
    borderRadius: 15
  },
  commonContainerStyle: {
    paddingLeft: 12,
    flex: 1
  },
  topContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1
  },
  infoContainerStyle: {
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 5
  },
  doctorNameStyle: {
    fontSize: FONT_L,
    color: "black",
    fontWeight: FONT_WEIGHT_THIN
  },
  specializationStyle: {
    fontSize: FONT_S,
    color: "grey",
    fontWeight: "100",
    paddingBottom: 20
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  hospitalNameStyle: {
    fontSize: FONT_S,
    marginLeft: 8,
    marginRight: 8,
    color: "grey",
    fontWeight: "100"
  },
  statusIndicatorStyle: {
    borderRadius: 35,
    height: 12,
    width: 12
  },
  statusAvailableStyle: {
    backgroundColor: STATUS_AVAILABLE_COLOR
  },
  statusNotAvailableStyle: {
    backgroundColor: STATUS_NOT_AVAILABLE_COLOR
  },
  favContainerStyle: {
    paddingLeft: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 2,
    flex: 1
  },
  favIconStyle: {
    width: 30,
    height: 30,
    color: "red"
  }
});

export default DoctorCard;
