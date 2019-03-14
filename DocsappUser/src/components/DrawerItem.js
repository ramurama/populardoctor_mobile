import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Icon } from "native-base";
import {
  SECONDARY,
  BACKGROUND_3,
  PRIMARY,
  SECONDARY_LIGHT,
  SECONDARY_DARK
} from "../config/colors";
import PropTypes from "prop-types";
import { FONT_M, FONT_XXXL } from "../config/fontSize";
import { FONT_WEIGHT_MEDIUM } from "../config/fontWeight";

const propTypes = {
  title: PropTypes.string.isRequired,
  onItemPress: PropTypes.func.isRequired,
  pressedItem: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired
};

class DrawerItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onItemPress, pressedItem, title, icon, iconType } = this.props;
    const itemBgColor =
      pressedItem === title
        ? styles.selectedItemBgColor
        : styles.defaultItemBgColor;

    return (
      <TouchableOpacity style={styles.flex1} onPress={() => onItemPress()}>
        <View style={[styles.flex1, itemBgColor, styles.textMainViewStyle]}>
          <View style={styles.flex1}>
            <Icon style={styles.itemIconStyle} name={icon} type={iconType} />
          </View>
          <View style={styles.textViewStyle}>
            <Text style={[styles.titleStyle, styles.defaultFontColor]}>
              {title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  titleStyle: {
    fontSize: FONT_M,
    flex: 1,
    flexDirection: "column",
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  defaultFontColor: {
    color: SECONDARY
  },
  selectedItemBgColor: {
    backgroundColor: BACKGROUND_3
  },
  defaultItemBgColor: {
    backgroundColor: "white"
  },
  textMainViewStyle: {
    padding: 15,
    paddingLeft: 15,
    flexDirection: "row"
  },
  textViewStyle: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center"
  },
  itemIconStyle: {
    color: SECONDARY_LIGHT,
    fontSize: FONT_XXXL
  }
});
