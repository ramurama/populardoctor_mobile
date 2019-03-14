import React from "react";
import { View, StyleSheet, TextInput, Alert } from "react-native";
import {
  Container,
  Content,
  Form,
  Label,
  Item,
  Text,
  Button
} from "native-base";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import { SECONDARY, PRIMARY, WHITE } from "../config/colors";
import {
  isPasswordLengthOk,
  isStringsEqual,
  isNotUndefined
} from "../commons/utils";
import Header from "../components/HeaderDoctor";
import APIService from "../services/APIService";
import {
  STR_ERROR,
  STR_PASSWORD_LENGTH,
  STR_OLD_NEW_PASSWORD_COMPR_ERR,
  STR_NEW_CONFIRM_NEW_PASSWORD_ERR,
  STR_SUCCESS,
  CHANGE_PASSWORD
} from "../constants/strings";
import { FONT_XS } from "../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    };
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  _rendercurrentPasswordInputItem() {
    return (
      <Item style={[styles.itemStyle]}>
        <Label style={[styles.labelStyle]}>Current Password</Label>
        <TextInput
          style={styles.inputStyle}
          secureTextEntry={true}
          onChangeText={value =>
            this.setState({ currentPassword: value.trim() })
          }
          autoCapitalize={"none"}
          placeholder=""
        />
      </Item>
    );
  }

  _renderNewPasswordInputItem() {
    return (
      <Item style={[styles.itemStyle]}>
        <Label style={[styles.labelStyle]}>New Password</Label>
        <TextInput
          style={styles.inputStyle}
          secureTextEntry={true}
          onChangeText={value => this.setState({ newPassword: value.trim() })}
          autoCapitalize={"none"}
          placeholder=""
        />
      </Item>
    );
  }

  _renderConfirmPasswordInputItem() {
    return (
      <Item style={[styles.itemStyle]}>
        <Label style={[styles.labelStyle]}>Confirm New Password</Label>
        <TextInput
          style={styles.inputStyle}
          secureTextEntry={true}
          onChangeText={value =>
            this.setState({ confirmNewPassword: value.trim() })
          }
          autoCapitalize={"none"}
          placeholder=""
        />
      </Item>
    );
  }

  _handleChangePassword = () => {
    const { currentPassword, newPassword, confirmNewPassword } = this.state;
    if (
      !isPasswordLengthOk(currentPassword) ||
      !isPasswordLengthOk(newPassword) ||
      !isPasswordLengthOk(confirmNewPassword)
    ) {
      Alert.alert(STR_ERROR, STR_PASSWORD_LENGTH);
    } else if (isStringsEqual(currentPassword, newPassword)) {
      Alert.alert(STR_ERROR, STR_OLD_NEW_PASSWORD_COMPR_ERR);
    } else if (!isStringsEqual(newPassword, confirmNewPassword)) {
      Alert.alert(STR_ERROR, STR_NEW_CONFIRM_NEW_PASSWORD_ERR);
    } else {
      this.setState({ spinner: true }, this._changePassword);
    }
  };

  _changePassword = () => {
    const { currentPassword, newPassword } = this.state;
    APIService.changePassword(
      { currentPassword, newPassword },
      this.props.token,
      (status, message) => {
        this.setState({ spinner: false }, () => {
          if (status) {
            setTimeout(() => Alert.alert(STR_SUCCESS, message), 500);
          } else {
            setTimeout(() => Alert.alert(STR_ERROR, message), 500);
          }
        });
      }
    );
  };

  _renderChangePasswordButton() {
    return (
      <Button
        style={[styles.changePasswordBtn]}
        // {[styles.registerBtn, styles.widthStyle]}
        full
        onPress={this._handleChangePassword}
      >
        <Text style={styles.changePasswordBtnText}>Reset</Text>
      </Button>
    );
  }

  _renderHeader() {
    let headerRequired = this.props.navigation.getParam("headerRequired");
    if (isNotUndefined(headerRequired) && headerRequired) {
      return <Header {...this.props} title={CHANGE_PASSWORD} />;
    }
    return <View />;
  }

  render() {
    return (
      <Container>
        {this._renderHeader()}
        <Content padder>
          <View style={styles.mainView}>
            {this._rendercurrentPasswordInputItem()}
            {this._renderNewPasswordInputItem()}
            {this._renderConfirmPasswordInputItem()}
            {this._renderChangePasswordButton()}
          </View>
          {this._renderSpinner()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
});

export default connect(mapStateToProps)(ChangePassword);

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column",
    justifyContent: "center"
  },
  itemStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 16,
    borderBottomWidth: 0
  },
  inputStyle: {
    flex: 1,
    width: "100%",
    borderWidth: 2,
    marginTop: 4,
    borderColor: SECONDARY,
    borderRadius: 5,
    height: 45,
    padding: 5
  },
  labelStyle: {
    fontSize: FONT_XS,
    color: "grey"
  },
  changePasswordBtn: {
    backgroundColor: SECONDARY,
    flex: 1,
    borderRadius: 5,
    marginTop: 30
  },
  changePasswordBtnText: {
    color: PRIMARY,
    fontWeight: FONT_WEIGHT_BOLD
  }
});
