import React from "react";
import { StatusBar } from "react-native";
import { SECONDARY } from "../config/colors";

class CommonStatusBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let barStyle = 'light';
    if (this.props.barStyle !== undefined) {
      barStyle = this.props.barStyle;
    }

    if ( barStyle === "light") {
      return <StatusBar backgroundColor={SECONDARY} barStyle="light-content" />;
    }
    return <StatusBar backgroundColor={SECONDARY} barStyle="dark-content" />;
  }
}

export default CommonStatusBar;
