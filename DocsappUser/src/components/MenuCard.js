import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";
import { Icon } from "native-base";
import PropTypes from "prop-types";
import { ON_PRIMARY, SECONDARY } from "../config/colors";
import commonStyles from "../commons/styles";
import { FONT_WEIGHT_MEDIUM } from "../config/fontWeight";

const propTypes = {
  onPress: PropTypes.func,
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const SCREEN_W = Dimensions.get("window").width;

class MenuCard extends React.Component {
  render() {
    const { iconName, menuTitle, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.containerStyle}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.menuTitleView}>
              <Icon
                style={styles.iconStyle}
                name={iconName}
                type="SimpleLineIcons"
              />
            </View>
            <View style={styles.menuTitleView}>
              <Text style={[styles.menuTitleStyle, commonStyles.fontFamily]}>
                {menuTitle}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    padding: 8,
    margin: 3,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 10,
    elevation: 3
  },
  iconStyle: {
    color: SECONDARY,
    padding: 2
  },
  menuTitleStyle: {
    color: "grey",
    fontSize: SCREEN_W * 0.048,
    fontWeight: FONT_WEIGHT_MEDIUM,
    padding: 8,
    paddingLeft: 25
  },
  menuTitleView: {
    flexDirection: "column",
    justifyContent: "center"
  }
});

export default MenuCard;
