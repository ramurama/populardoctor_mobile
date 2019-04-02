import React from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Header, Text, Left, Right, Body, Icon } from "native-base";
import PropTypes from "prop-types";
import commonStyles from "../commons/styles";
import { PRIMARY } from "../config/colors";
import StatusBar from "../components/StatusBar";
import { VIEW_DR_MENU } from "../constants/viewNames";
import { FONT_L, FONT_XXL, FONT_XXXL } from "../config/fontSize";
import { FONT_WEIGHT_MEDIUM } from "../config/fontWeight";

const propTypes = {
  title: PropTypes.string.isRequired,
  showRefresh: PropTypes.bool,
  onRefresh: PropTypes.func
};

class HeaderDoctor extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderMenuButton() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
        <Icon name="appstore1" type="AntDesign" style={[styles.menuIcon]} />
      </TouchableOpacity>
    );
  }

  _renderRefreshButton() {
    return (
      <TouchableOpacity onPress={() => this.props.onRefresh()}>
        <Icon name="refresh" type="SimpleLineIcons" style={[styles.menuIcon]} />
      </TouchableOpacity>
    );
  }

  render() {
    let titleLeftPadding = {
      paddingLeft: 0
    };
    if (Platform.OS === "android") {
      titleLeftPadding = {
        paddingLeft: 15
      };
    }
    return (
      <Header style={commonStyles.headerDefault}>
        <StatusBar />
        <Left>{this._renderMenuButton()}</Left>
        <Body style={[styles.bodyStyle, titleLeftPadding]}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.titleText}>
            {this.props.title}
          </Text>
        </Body>
        <Right>{this.props.showRefresh && this._renderRefreshButton()}</Right>
      </Header>
    );
  }
}

export default HeaderDoctor;

const styles = StyleSheet.create({
  menuIcon: {
    color: PRIMARY,
    fontSize: FONT_XXXL,
    paddingLeft: 5
  },
  titleText: {
    color: PRIMARY,
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_MEDIUM
  },
  bodyStyle: {
    flex: 3,
    paddingLeft: 20
  }
});
