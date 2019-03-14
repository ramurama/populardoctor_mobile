import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import {
  Container,
  Content,
  Form,
  Input,
  Label,
  Item,
  Text,
  Icon,
  Button,
  ActionSheet
} from "native-base";
import { icons } from "../constants/icons";
import { PRIMARY, SECONDARY, WHITE } from "../config/colors";
import { connect } from "react-redux";
import { DatePicker } from "../components/Datepicker/Datepicker";
import {
  VIEW_PRIVACY,
  VIEW_TERMS,
  VIEW_MOBILE_VERIFICATION
} from "../constants/viewNames";
import Spinner from "react-native-loading-spinner-overlay";
import StatusBar from "../components/StatusBar";
import * as Actions from "../actions";
import { isPasswordLengthOk, isStringsEqual } from "../commons/utils";
import {
  STR_ERROR,
  STR_PASSWORD_LENGTH,
  STR_PASSWORD_CONFIRM_PASSWORD_ERR,
  GENDER,
  STR_SELECT_GENDER,
  STR_NAME_NOT_EMPTY,
  STR_DOB_NOT_EMPTY,
  STR_MOBILE_NOT_EMPTY,
  STR_INVALID_MOBILE_NUM,
  STR_MOBILE_NUM_EXISTS
} from "../constants/strings";
import { isNullOrEmpty, isValidMobileNumber } from "../commons/utils";
import APIService from "../services/APIService";
import { FONT_XS, FONT_XXS } from "../config/fontSize";

class Register extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    this.state = {
      fullName: "",
      dateOfBirth: new Date(
        now.getFullYear() - 10,
        now.getMonth(),
        now.getDate()
      ),
      gender: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      spinner: false
    };
  }

  _handleRegister = () => {
    const {
      fullName,
      dateOfBirth,
      gender,
      mobile,
      password,
      confirmPassword
    } = this.state;

    if (isNullOrEmpty(fullName)) {
      Alert.alert(STR_ERROR, STR_NAME_NOT_EMPTY);
    } else if (isNullOrEmpty(gender)) {
      Alert.alert(STR_ERROR, STR_SELECT_GENDER);
    } else if (isNullOrEmpty(mobile)) {
      Alert.alert(STR_ERROR, STR_MOBILE_NOT_EMPTY);
    } else if (!isValidMobileNumber(mobile)) {
      Alert.alert(STR_ERROR, STR_INVALID_MOBILE_NUM);
    } else if (
      isPasswordLengthOk(password) &&
      isPasswordLengthOk(confirmPassword)
    ) {
      if (isStringsEqual(password, confirmPassword)) {
        this.props.setCustomerSignUpData({
          fullName,
          dateOfBirth,
          gender,
          mobile,
          password
        });

        this.setState({ spinner: true }, () => {
          APIService.isMobileNumberExists(mobile, status => {
            this.setState({ spinner: false }, () => {
              if (status) {
                setTimeout(
                  () => Alert.alert(STR_ERROR, STR_MOBILE_NUM_EXISTS),
                  500
                );
              } else {
                setTimeout(
                  () =>
                    this.props.navigation.navigate(VIEW_MOBILE_VERIFICATION),
                  500
                );
              }
            });
          });
        });
      } else {
        Alert.alert(STR_ERROR, STR_PASSWORD_CONFIRM_PASSWORD_ERR);
      }
    } else {
      Alert.alert(STR_ERROR, STR_PASSWORD_LENGTH);
    }
  };

  _renderFullNameInputItem() {
    return (
      <Item style={styles.itemStyle}>
        <Label style={[styles.labelStyle]}>Full name</Label>
        <Input
          style={styles.inputStyle}
          onChangeText={value =>
            this.setState({
              fullName: value.trim()
            })
          }
          autoCapitalize="words"
          placeholder=""
        />
      </Item>
    );
  }

  _renderDOBInputItem() {
    const now = new Date();
    return (
      <Item style={styles.itemStyle}>
        <Label style={[styles.labelStyle]}>Date of birth</Label>
        <DatePicker
          date={this.state.dob}
          mode="date"
          format="DD-MM-YYYY"
          maxDate={
            new Date(now.getFullYear() - 10, now.getMonth(), now.getDate())
          }
          style={styles.dateOfBirthPicker}
          customStyles={{
            dateInput: {
              alignSelf: "flex-start"
            }
          }}
          onDateChange={date => {
            this.setState({ dateOfBirth: date });
          }}
        />
      </Item>
    );
  }

  _renderGenderPickerInput() {
    const buttons = [GENDER.MALE, GENDER.FEMALE, "Cancel"];
    return (
      <Item style={styles.itemStyle}>
        <Label style={styles.labelStyle}>Gender</Label>
        <TouchableWithoutFeedback
          onPress={() =>
            ActionSheet.show(
              {
                options: buttons,
                title: "Gender",
                cancelButtonIndex: buttons.length - 1
              },
              buttonIndex => {
                if (buttonIndex != buttons.length - 1) {
                  this.setState({ gender: buttons[buttonIndex] });
                }
              }
            )
          }
        >
          <View style={styles.genderViewStyle}>
            <Text style={{ paddingLeft: 5 }}>{this.state.gender}</Text>
          </View>
        </TouchableWithoutFeedback>
      </Item>
    );
  }

  _renderMobileNumberInputItem() {
    return (
      <Item style={[styles.itemStyle]}>
        <Label style={[styles.labelStyle]}>Mobile</Label>
        <Input
          style={styles.inputStyle}
          keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
          onChangeText={value => this.setState({ mobile: value.trim() })}
          placeholder=""
          maxLength={10}
        />
      </Item>
    );
  }

  _renderPasswordInputItem() {
    return (
      <Item style={[styles.itemStyle]}>
        <Label style={[styles.labelStyle]}>Password</Label>
        <Input
          style={styles.inputStyle}
          secureTextEntry={true}
          onChangeText={value => this.setState({ password: value.trim() })}
          autoCapitalize={"none"}
          placeholder=""
        />
      </Item>
    );
  }

  _renderConfirmPasswordInputItem() {
    return (
      <Item style={[styles.itemStyle]}>
        <Label style={[styles.labelStyle]}>Confirm Password</Label>
        <Input
          style={styles.inputStyle}
          secureTextEntry={true}
          onChangeText={value =>
            this.setState({ confirmPassword: value.trim() })
          }
          autoCapitalize={"none"}
          placeholder=""
        />
      </Item>
    );
  }

  _renderRegisterButton() {
    return (
      <Button
        style={[styles.registerBtn]}
        // {[styles.registerBtn, styles.widthStyle]}
        full
        onPress={this._handleRegister}
      >
        <Icon
          name={icons.arrowForward}
          style={styles.registerIcon}
          type="MaterialIcons"
        />
        {/* <Text style={styles.btnText}>Sign Up</Text> */}
      </Button>
    );
  }

  _renderConfirmationText() {
    return (
      <Text style={styles.textSize}>
        By clicking "Sign Up", I confirm that I have read and agreed to the{" "}
        <Text
          style={[styles.textSize, styles.linkText]}
          onPress={() => this.props.navigation.navigate(VIEW_TERMS)}
        >
          Terms & Conditions
        </Text>{" "}
        and{" "}
        <Text
          style={[styles.textSize, styles.linkText]}
          onPress={() => this.props.navigation.navigate(VIEW_PRIVACY)}
        >
          Privacy Policy
        </Text>
      </Text>
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  _renderContent() {
    return (
      <Content>
        <View style={styles.mainView}>
          <View>
            <Form style={styles.formStyle}>
              {this._renderFullNameInputItem()}
              {this._renderDOBInputItem()}
              {this._renderGenderPickerInput()}
              {this._renderMobileNumberInputItem()}
              {this._renderPasswordInputItem()}
              {this._renderConfirmPasswordInputItem()}
            </Form>
          </View>

          <View style={styles.btnView}>{this._renderRegisterButton()}</View>
          <View style={{ padding: 20 }}>{this._renderConfirmationText()}</View>
          {this._renderSpinner()}
        </View>
      </Content>
    );
  }

  render() {
    return (
      <Container>
        <StatusBar />
        {this._renderContent()}
      </Container>
    );
  }
}

export default connect(
  null,
  Actions
)(Register);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  formStyle: {
    paddingRight: 20,
    paddingTop: 20
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
    marginTop: 4,
    borderWidth: 2,
    borderColor: SECONDARY,
    borderRadius: 5
  },
  labelStyle: {
    fontSize: FONT_XS,
    color: "grey"
  },
  registerBtn: {
    backgroundColor: SECONDARY,
    flex: 1,
    borderRadius: 5,
    margin: 20
  },
  btnText: {
    color: PRIMARY
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20
  },

  text: {
    padding: 20
  },
  textSize: {
    color: "grey",
    fontSize: FONT_XXS
  },
  linkText: {
    color: SECONDARY
  },
  dateOfBirthPicker: {
    marginTop: 4,
    borderWidth: 2,
    borderColor: SECONDARY,
    borderRadius: 5,
    width: "100%"
  },
  genderViewStyle: {
    height: 45,
    width: "100%",
    marginTop: 4,
    borderWidth: 2,
    borderColor: SECONDARY,
    borderRadius: 5,
    justifyContent: "center"
  }
});
