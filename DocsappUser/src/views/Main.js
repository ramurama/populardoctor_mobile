import React from "react";
import { NetInfo, Alert } from "react-native";
import { connect } from "react-redux";
import LoginNavigator from "../navigators/LoginNavigator";
import {
  MSG_NO_CONNECTIVITY_TITLE,
  MSG_NO_CONNECTIVITY_CONTENT
} from "../constants/strings";
import * as Actions from "../actions";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleConnectionChange = this.handleConnectionChange.bind(this);
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      this.props.setNetworkConnStatus(isConnected);
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  handleConnectionChange(isConnected) {
    this.props.setNetworkConnStatus(isConnected);
    if (!this.props.isNetworkConnected) {
      Alert.alert(MSG_NO_CONNECTIVITY_TITLE, MSG_NO_CONNECTIVITY_CONTENT);
    }
  }
  render() {
    return <LoginNavigator />;
  }
}

const mapStateToProps = state => ({
  isNetworkConnected: state.isNetworkConnected
});

export default connect(
  mapStateToProps,
  Actions
)(Main);
