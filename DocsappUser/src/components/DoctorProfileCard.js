import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import {
  SECONDARY,
  HELPER_TEXT_COLOR,
  WHITE,
  SECONDARY_LIGHT,
  BACKGROUND_2,
  BACKGROUND_1,
  BACKGROUND_DARK_GREY,
  DISABLED_GREY,
  PRIMARY,
  DARK_WHITE
} from "../config/colors";
import { FONT_S, FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_THIN, FONT_WEIGHT_XXBOLD } from "../config/fontWeight";

const propTypes = {
  imageURL: PropTypes.string.isRequired,
  specialization: PropTypes.string.isRequired,
  doctorName: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  years: PropTypes.string.isRequired,
  onProfileIconPress: PropTypes.func.isRequired,
  onFavoriteIconPress: PropTypes.func.isRequired
};

class DoctorProfileCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: this.props.isFavorite
    };
  }

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

  _handleFavoriteIcon = () => {
    this.setState({ isFavorite: !this.state.isFavorite }, () =>
      this.props.onFavoriteIconPress(this.state.isFavorite)
    );
  };

  _renderFavIcon() {
    let favStyle = styles.nonFavIconStyle;
    let favIconName = "heart-outline";
    if (this.state.isFavorite) {
      favIconName = "heart";
      favStyle = styles.favIconStyle;
    }
    return (
      <TouchableOpacity
        style={styles.favContainerStyle}
        onPress={this._handleFavoriteIcon}
      >
        <Icon
          name={favIconName}
          style={favStyle}
          type="MaterialCommunityIcons"
        />
      </TouchableOpacity>
    );
  }

  _renderTopContainer(doctorName, specialization) {
    return (
      <View style={styles.topContainerStyle}>
        {this._renderDoctorInfoContainer(doctorName, specialization)}
        {this._renderFavIcon()}
      </View>
    );
  }

  _renderProfileIcon() {
    return (
      <View style={styles.profileIconViewStyle}>
        <TouchableOpacity onPress={() => this.props.onProfileIconPress()}>
          <Icon
            style={styles.profileIconStyle}
            name="information-outline"
            type="MaterialCommunityIcons"
          />
        </TouchableOpacity>
      </View>
    );
  }

  _renderBottomContainer(years) {
    return (
      <View style={styles.bottomContainer}>
        {this._renderYears(years)}
        <Text style={styles.subTextStyle}>Years of Experience</Text>
        {this._renderProfileIcon()}
      </View>
    );
  }

  _renderYears(years) {
    return (
      <View style={styles.yearPanel}>
        <Text
          style={styles.experienceStyle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {years}+
        </Text>
      </View>
    );
  }

  render() {
    const { imageURL, doctorName, specialization, years } = this.props;

    return (
      <View style={styles.containerStyle}>
        {this._renderAvatarImage(imageURL)}
        <View style={styles.commonContainerStyle}>
          {this._renderTopContainer(doctorName, specialization)}
          {this._renderBottomContainer(years)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    padding: 12,
    marginTop: 0,
    backgroundColor: "white",
    shadowColor: "grey",
    // marginBottom: 6,
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: DARK_WHITE,
    height: 130
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
    alignItems: "center",
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
    color: HELPER_TEXT_COLOR,
    fontWeight: "100",
    paddingTop: 10,
    paddingBottom: 20
  },
  favContainerStyle: {
    paddingLeft: 12,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingRight: 2,
    flex: 1
  },
  favIconStyle: {
    width: 30,
    height: 30,
    color: "red"
  },
  nonFavIconStyle: {
    width: 30,
    height: 30,
    color: SECONDARY
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1
  },
  experienceStyle: {
    fontSize: 15,
    color: SECONDARY,
    fontWeight: FONT_WEIGHT_XXBOLD
  },
  yearPanel: {
    width: 35,
    height: 35,
    // backgroundColor:SECONDARY,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: SECONDARY,
    justifyContent: "center",
    alignItems: "center"
  },
  subTextStyle: {
    color: HELPER_TEXT_COLOR,
    fontSize: FONT_S,
    marginLeft: 8
  },
  profileIconViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
    // padding: 10
  },
  profileIconStyle: {
    color: SECONDARY
  }
});

export default DoctorProfileCard;
