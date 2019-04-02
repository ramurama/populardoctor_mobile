import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import {
  SECONDARY,
  SECONDARY_DARK,
  WHITE,
  HELPER_TEXT_COLOR,
  DISABLED_GREY
} from "../config/colors";
import {
  VERIFIED,
  SUCCESS,
  MOBILE_NUMBER_EXISTS,
  MSG_NO_CONNECTIVITY_TITLE,
  MSG_NO_CONNECTIVITY_CONTENT,
  STR_ERROR,
  STR_SUCCESS
} from "../constants/strings";
import * as Actions from "../actions";
import APIService from "../services/APIService";
import {
  VIEW_LOGIN,
  VIEW_REGISTER,
  VIEW_RESET_PASSWORD
} from "../constants/viewNames";
import { FONT_M, FONT_S, FONT_XL } from "../config/fontSize";
import { FONT_WEIGHT_XXBOLD } from "../config/fontWeight";
import { isStringsEqual } from "../commons/utils";

const MAX_LENGTH_CODE = 4;

class MobileVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      otp: ""
    };
  }

  componentDidMount() {
    this._sendVerificationCode();
  }

  _sendVerificationCode() {
    if (this.props.isNetworkConnected) {
      this.setState({ spinner: true }, () => {
        APIService.sendOtp(
          this.props.customerData.mobile,
          (status, message) => {
            this.setState({ spinner: false });
          }
        );
      });
    } else {
      Alert.alert(MSG_NO_CONNECTIVITY_TITLE, MSG_NO_CONNECTIVITY_CONTENT);
    }
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  _handleResendVerificationCode = () => {
    this._sendVerificationCode();
  };

  _handleVerifyMobileNumber = () => {
    console.log("Verify mobile number invoked.");
    if (this.props.isNetworkConnected) {
      this.setState({ spinner: true }, () => {
        APIService.verifyOtp(
          this.props.customerData.mobile,
          this.state.otp,
          (status, message) => {
            this.setState({ spinner: false }, () => {
              if (status) {
                this._handleVerificationResponse();
              } else {
                setTimeout(() => Alert.alert(STR_ERROR, message), 400);
              }
            });
          }
        );
      });
    } else {
      console.log("No internet connectivity.");
      Alert.alert(MSG_NO_CONNECTIVITY_TITLE, MSG_NO_CONNECTIVITY_CONTENT);
    }
  };

  _handleVerificationResponse() {
    const sourceScreen = this.props.navigation.getParam("sourceScreen");
    if (isStringsEqual(sourceScreen, VIEW_REGISTER)) {
      this.setState({ spinner: true }, () => {
        APIService.signUpCustomer(
          this.props.customerData,
          (status, message) => {
            if (status) {
              this.setState({ spinner: false }, () => {
                setTimeout(() => {
                  Alert.alert(STR_SUCCESS, message, [
                    {
                      text: "OK",
                      onPress: () => this.props.navigation.navigate(VIEW_LOGIN)
                    }
                  ]);
                }, 400);
              });
            }
          }
        );
      });
    } else if (isStringsEqual(sourceScreen, VIEW_LOGIN)) {
      this.props.navigation.navigate(VIEW_RESET_PASSWORD);
    }
  }

  _renderResendVerificationCode() {
    return (
      <View>
        <TouchableOpacity onPress={this._handleResendVerificationCode}>
          <Text style={styles.resendVerification}>
            Resend verification code
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderVerifyButton() {
    const isDisabled = this.state.otp.length !== 4;
    const style = [styles.button];
    if (isDisabled) {
      style.push({ backgroundColor: DISABLED_GREY });
    }
    return (
      <TouchableOpacity
        style={style}
        onPress={this._handleVerifyMobileNumber}
        disabled={isDisabled}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    );
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    let headerText =
      "Verification code sent to: " + this.props.customerData.mobile;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        {this._renderSpinner()}
        <Text style={styles.header}>{headerText}</Text>

        <View style={styles.form}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              type={"TextInput"}
              underlineColorAndroid={"transparent"}
              autoCapitalize={"none"}
              autoCorrect={false}
              onChangeText={value => this.setState({ otp: value })}
              placeholder={"_ _ _ _"}
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              style={[styles.textInput, styles.inputText]}
              returnKeyType="go"
              placeholderTextColor={SECONDARY}
              selectionColor={SECONDARY}
              maxLength={MAX_LENGTH_CODE}
              value={this.state.textValue}
            />
          </View>

          {this._renderResendVerificationCode()}
          {this._renderVerifyButton()}
        </View>

        <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
      </KeyboardAvoidingView>
    );
  }
}

export const mapStateToProps = state => ({
  isNetworkConnected: state.isNetworkConnected,
  customerData: state.customerData
});

export default connect(
  mapStateToProps,
  Actions
)(MobileVerification);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  header: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    color: "#4A4A4A"
  },
  form: {
    margin: 5
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    fontSize: FONT_XL,
    color: SECONDARY_DARK
  },
  button: {
    margin: 10,
    marginTop: 20,
    height: 50,
    backgroundColor: SECONDARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Helvetica",
    fontSize: FONT_M,
    fontWeight: FONT_WEIGHT_XXBOLD
  },
  resendVerification: {
    marginTop: 30,
    fontSize: FONT_S,
    textAlign: "center",
    color: HELPER_TEXT_COLOR
  },
  inputText: {
    height: 50,
    textAlign: "center",
    fontSize: 40,
    fontWeight: FONT_WEIGHT_XXBOLD,
    fontFamily: "Courier"
  }
});
