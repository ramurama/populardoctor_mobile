import {
  Button,
  Container,
  Content,
  Form,
  Icon,
  Input,
  Item,
  Label,
  Picker,
  Text
} from "native-base";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage
} from "react-native";
import * as Animatable from "react-native-animatable";
import Spinner from "react-native-loading-spinner-overlay";
import ModalDialog from "react-native-modalbox";
import { connect } from "react-redux";
import * as Actions from "../actions";
import StatusBar from "../components/StatusBar";
import {
  ICON_INACTIVE,
  ON_PRIMARY,
  PRIMARY,
  SECONDARY,
  SECONDARY_DARK,
  WHITE,
  DISABLED_GREY
} from "../config/colors";
import { FONT_L, FONT_S, FONT_XL, FONT_XXL } from "../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";
import {
  KEY_USER_DATA,
  KEY_FCM_TOKEN,
  KEY_IS_PREMIUM_USER,
  KEY_INSTALLED_DATE
} from "../constants/AsyncDataKeys";
import { icons } from "../constants/icons";
import {
  MSG_NO_CONNECTIVITY_CONTENT,
  MSG_NO_CONNECTIVITY_TITLE,
  TRY_AGAIN
} from "../constants/strings";
import {
  USER_CUSTOMER,
  USER_DOCTOR,
  USER_FRONT_DESK
} from "../constants/userType";
import {
  VIEW_MOBILE_VERIFICATION,
  VIEW_NAV_DRAWER_DR,
  VIEW_NAV_DRAWER_FD,
  VIEW_NAV_USER,
  VIEW_REGISTER,
  VIEW_LOGIN,
  VIEW_NAV_USER_HOME
} from "../constants/viewNames";
import APIService from "../services/APIService";
import { AsyncDataService } from "../services/AsyncDataService";
import { DBService } from "../services/DBService";
import { isNullOrEmpty, getDateString } from "../commons/utils";
import Moment from "moment";

const SCREEN_W = Dimensions.get("window").width;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      password: "",
      spinner: false,
      showPassword: false,
      isForgotPasswordModalOpen: false,
      selectedUserType: USER_CUSTOMER,
      mobileForgotPassword: ""
    };
  }

  componentDidMount() {
    this.setState({
      spinner: true
    });
    DBService.initDB(() => {
      this._initLogin();
    });
  }

  _moveToRelevantNavigator(userType) {
    if (userType == USER_CUSTOMER) {
      // this.props.navigation.navigate(VIEW_NAV_USER);
      this.props.navigation.navigate(VIEW_NAV_USER_HOME);
    } else if (userType == USER_DOCTOR) {
      this.props.navigation.navigate(VIEW_NAV_DRAWER_DR);
    } else if (userType == USER_FRONT_DESK) {
      this.props.navigation.navigate(VIEW_NAV_DRAWER_FD);
    }
  }

  async _initLogin() {
    this.setState({
      spinner: false
    });
    DBService.getLoggedUserToken(async (token, userType) => {
      if (token !== null) {
        this.props.setToken(token);
        this.props.setUserType(userType);
        let userData = await AsyncDataService.getItem(KEY_USER_DATA, true);
        //save user data to redux state
        this.props.setUserData(userData);
        this._moveToRelevantNavigator(userType);
      } else {
        console.log("***** token not available");
      }
    });
    this._checkAndUpdatePremiumStatus();
  }

  async _checkAndUpdatePremiumStatus() {
    try {
      //isPremiumUser
      //if null then add false
      let isPremiumUser;
      isPremiumUser = await AsyncDataService.getItem(KEY_IS_PREMIUM_USER, true);
      if (isNullOrEmpty(isPremiumUser)) {
        isPremiumUser = false;
        await AsyncDataService.setItem(
          KEY_IS_PREMIUM_USER,
          isPremiumUser,
          true
        );
      }
      //installedDate
      //if null set current date (first opening of app)
      let installedDate = await AsyncDataService.getItem(
        KEY_INSTALLED_DATE,
        false
      );
      if (isNullOrEmpty(installedDate)) {
        installedDate = getDateString(new Date());
        const saveStatus = await AsyncDataService.setItem(
          KEY_INSTALLED_DATE,
          installedDate,
          false
        );
      } else {
        const installedDateMoment = new Moment(installedDate);
        const nowMoment = new Moment(new Date());
        const diff = nowMoment.diff(installedDateMoment, "days");
        console.log("*********************************************");
        //difference is greater than or equal to 30 days.
        if (diff >= 1) {
          isPremiumUser = true;
          await AsyncDataService.setItem(
            KEY_IS_PREMIUM_USER,
            isPremiumUser,
            true
          );
        }
        //set isPremium to redux state
        console.log(isPremiumUser);
        this.props.setIsPremiumUser(isPremiumUser);
      }
    } catch (err) {
      console.log("***** Error " + err);
    }
  }

  _handleLogin = () => {
    const { mobile, password } = this.state;
    if (mobile.length > 0 && password.length > 0) {
      if (this.props.isNetworkConnected) {
        this.setState({ spinner: true }, () => {
          APIService.login(
            mobile,
            password,
            this.state.selectedUserType,
            (status, token, message, userData) => {
              if (status) {
                //save user data on login success
                AsyncDataService.setItem(KEY_USER_DATA, userData, true);
                //save user data to redux state
                this.props.setUserData(userData);
                //update FCM token to DB
                this.updateDeviceToken(token);

                const userType = this.state.selectedUserType;
                DBService.setLoginStatus({ mobile, token, userType }, () => {
                  this.props.setToken(token);
                  this.props.setUserType(userType);
                  this.setState({ spinner: false }, () => {
                    setTimeout(
                      () => this._moveToRelevantNavigator(userType),
                      10
                    );
                  });
                });
              } else {
                this.setState({ spinner: false }, () => {
                  setTimeout(() => {
                    Alert.alert(TRY_AGAIN, message);
                  }, 10);
                });
              }
            }
          );
        });
      } else {
        Alert.alert(MSG_NO_CONNECTIVITY_TITLE, MSG_NO_CONNECTIVITY_CONTENT);
      }
    }
  };

  async updateDeviceToken(token) {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    console.log("***** FCM token --- " + fcmToken);
    APIService.updateDeviceToken(fcmToken, token, status => {
      console.log("***** Device token update status: " + status);
    });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  _renderMobileNumberInputItem() {
    return (
      <Item style={[styles.widthStyle, styles.inputMargin]}>
        <Icon name={icons.mobile} style={styles.iconColor} type="Entypo" />
        <Input
          placeholder="Mobile number"
          keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
          onChangeText={value => this.setState({ mobile: value.trim() })}
          autoCapitalize="none"
          maxLength={10}
          value={this.state.mobile}
        />
      </Item>
    );
  }

  _renderPasswordInputItem() {
    return (
      <Item style={[styles.inputMargin, styles.widthStyle]}>
        <Icon
          name={icons.lock}
          style={styles.iconColor}
          type="MaterialCommunityIcons"
        />
        <Input
          placeholder="Password"
          secureTextEntry={!this.state.showPassword}
          onChangeText={value => this.setState({ password: value.trim() })}
          autoCapitalize="none"
          value={this.state.password}
        />
        <Icon
          name={this.state.showPassword ? icons.eyeLine : icons.eye}
          type="Ionicons"
          style={styles.iconColor}
          onPress={() =>
            this.setState({
              showPassword: !this.state.showPassword
            })
          }
        />
      </Item>
    );
  }

  _renderUserTypePicker() {
    const CUSTOMER = "Customer";
    const DOCTOR = "Doctor";
    const FRONT_DESK = "Front Desk";

    return (
      <View style={styles.pickerView}>
        <View style={styles.pickerLabelView}>
          <Label>Login as</Label>
        </View>
        <View>
          <Picker
            mode="dropdown"
            iosHeader="User Type"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: 140 }}
            selectedValue={this.state.selectedUserType}
            onValueChange={selectedUserType =>
              this.setState({ selectedUserType })
            }
          >
            <Picker.Item label={CUSTOMER} value={USER_CUSTOMER} />
            <Picker.Item label={DOCTOR} value={USER_DOCTOR} />
            <Picker.Item label={FRONT_DESK} value={USER_FRONT_DESK} />
          </Picker>
        </View>
      </View>
    );
  }

  _renderForm() {
    return (
      <View style={styles.formStyle}>
        <Form>
          {this._renderMobileNumberInputItem()}
          {this._renderPasswordInputItem()}
          {this._renderUserTypePicker()}
        </Form>
      </View>
    );
  }

  _renderLoginButton() {
    return (
      <View style={styles.btnView}>
        <Button
          style={[styles.signInBtn, styles.widthStyle]}
          onPress={this._handleLogin}
          disabled={this.state.spinner}
          full
        >
          <Text style={styles.btnText}>Log In</Text>
        </Button>
      </View>
    );
  }

  _renderForgotPasswordLink() {
    return (
      <View style={styles.linksView}>
        <TouchableOpacity
          onPress={() => this.setState({ isForgotPasswordModalOpen: true })}
        >
          <Text style={styles.text}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderForgotPasswordModalDialog() {
    const isDisabled = this.state.mobileForgotPassword.length !== 10;
    const otpStyle = [styles.sendOtpText];
    if (isDisabled) {
      otpStyle.push({ color: DISABLED_GREY });
    }
    return (
      <ModalDialog
        style={[styles.forgotPasswordModal, styles.forgotPasswordDialogModal]}
        position={"center"}
        isDisabled={false}
        isOpen={this.state.isForgotPasswordModalOpen}
        onClosed={() => this.setState({ isForgotPasswordModalOpen: false })}
        backButtonClose={true}
        coverScreen={true}
      >
        <Text style={styles.forgotPasswordModalDialogText}>Mobile Number</Text>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Item style={styles.forgotPasswordItem}>
            <TextInput
              style={[
                styles.forgotPasswordModalTextInput,
                styles.forgotPasswordInputText
              ]}
              placeholder="Your mobile number"
              keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              autoFocus
              maxLength={10}
              onChangeText={value =>
                this.setState({ mobileForgotPassword: value })
              }
            />
          </Item>
          <TouchableOpacity onPress={this._handleSendOtp} disabled={isDisabled}>
            <Text style={otpStyle}>Send OTP</Text>
          </TouchableOpacity>
        </View>
      </ModalDialog>
    );
  }

  _handleSendOtp = () => {
    const { mobileForgotPassword } = this.state;

    this.setState({ isForgotPasswordModalOpen: false }, () =>
      setTimeout(() => {
        this.setState({ spinner: true }, () => {
          const { mobileForgotPassword } = this.state;
          this.props.setCustomerSignUpData({ mobile: mobileForgotPassword });
          this.props.navigation.navigate(VIEW_MOBILE_VERIFICATION, {
            sourceScreen: VIEW_LOGIN
          });
        });
      }, 100)
    );
  };

  _renderRegisterView() {
    return (
      <View style={styles.registerView}>
        <Text
          style={[styles.registerText, { color: SECONDARY }]}
          onPress={() => this.props.navigation.navigate(VIEW_REGISTER)}
        >
          Sign Up
        </Text>
        <Icon
          name={icons.arrowForward}
          style={styles.registerIcon}
          type="MaterialIcons"
        />
      </View>
    );
  }

  _renderLogo() {
    return (
      <Image
        style={styles.image}
        resizeMode={"contain"}
        source={require("./images/logo.png")}
      />
    );
  }

  _renderContent() {
    return (
      <Content
        padder
        contentContainerStyle={styles.content}
        scrollEnabled={false}
      >
        <KeyboardAvoidingView
          style={styles.mainView}
          behavior="padding"
          enabled
        >
          <Animatable.View animation="slideInUp" style={styles.imageView}>
            {this._renderLogo()}
          </Animatable.View>
          <Animatable.View animation="fadeInUp">
            {this._renderForm()}
            {this._renderLoginButton()}
            {this._renderForgotPasswordLink()}
          </Animatable.View>
          {this._renderRegisterView()}
        </KeyboardAvoidingView>
        {this._renderSpinner()}
      </Content>
    );
  }
  render() {
    return (
      <Container>
        <StatusBar barStyle="dark" />
        {this._renderContent()}
        {this._renderForgotPasswordModalDialog()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isNetworkConnected: state.isNetworkConnected,
  token: state.token
});

export default connect(
  mapStateToProps,
  Actions
)(Login);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center"
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 20
  },
  imageView: {
    alignItems: "center"
  },
  signInBtn: {
    backgroundColor: SECONDARY,
    borderRadius: 5
  },
  btnText: {
    color: PRIMARY,
    fontWeight: FONT_WEIGHT_BOLD
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15
  },
  mainView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  linksView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10
  },
  text: {
    color: ON_PRIMARY,
    fontSize: FONT_S
  },
  registerBtnText: {
    color: SECONDARY_DARK
  },
  widthStyle: {
    width: "95%"
  },
  inputMargin: {
    marginLeft: 0
  },
  iconColor: {
    color: ICON_INACTIVE
  },
  formStyle: {
    alignItems: "center"
  },
  registerView: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row"
  },
  registerText: {
    color: SECONDARY,
    fontSize: FONT_XL,
    paddingRight: 2,
    paddingTop: 4,
    fontWeight: FONT_WEIGHT_BOLD
  },
  registerIcon: {
    color: SECONDARY,
    fontSize: 30
  },
  forgotPasswordModal: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15
  },
  forgotPasswordModalTextInput: {
    height: 40,
    width: "80%"
  },
  forgotPasswordDialogModal: {
    height: 200,
    width: SCREEN_W * 0.9
  },
  forgotPasswordModalDialogText: {
    textAlign: "left",
    padding: 30,
    fontSize: FONT_XXL,
    fontWeight: FONT_WEIGHT_BOLD,
    color: SECONDARY,
    paddingTop: -30
  },
  forgotPasswordInputText: {
    height: 50,
    textAlign: "center",
    fontSize: FONT_XL,
    fontFamily: "Courier"
  },
  sendOtpText: {
    marginTop: 25,
    color: SECONDARY,
    fontSize: FONT_L
  },
  forgotPasswordItem: {
    borderBottomColor: SECONDARY
  },
  pickerView: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10
  },
  pickerLabelView: {
    justifyContent: "center"
  }
});
