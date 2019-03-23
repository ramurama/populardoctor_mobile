import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "../views/Login";
import { SECONDARY_DARK, PRIMARY } from "../config/colors";
import Register from "../views/Register";
import MobileVerification from "../views/MobileVerification";
import TermsConditions from "../views/TermsConditions";
import PrivacyPolicy from "../views/PrivacyPolicy";
import {
  REGISTER,
  PRIVACY_POLICY,
  TERMS_CONDITIONS,
  MOBILE_VERIFICATION,
  RESET_PASSWORD
} from "../constants/strings";
import { VIEW_LOGIN } from "../constants/viewNames";
import UserNavigator from "./UserNavigator";
import DrDrawerNavigator from "./DrDrawerNavigator";
import FronDeskDrawerNavigator from "./FdDrawerNavigator";
import ResetPassword from "../views/ResetPassword";
import commonStyles from "../commons/styles";

const LoginNavigator = createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: {
        header: null,
        headerBackTitle: null
      }
    },
    register: {
      screen: Register,
      navigationOptions: {
        title: REGISTER,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerBackTitle: null,
        headerTintColor: "white",
        headerStyle: commonStyles.headerDefault
      }
    },
    mobileVerification: {
      screen: MobileVerification,
      navigationOptions: {
        title: MOBILE_VERIFICATION,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerBackTitle: null,
        headerTintColor: "white",
        headerStyle: commonStyles.headerDefault
      }
    },
    terms: {
      screen: TermsConditions,
      navigationOptions: {
        title: TERMS_CONDITIONS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerStyle: commonStyles.headerDefault
      }
    },
    privacy: {
      screen: PrivacyPolicy,
      navigationOptions: {
        title: PRIVACY_POLICY,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerStyle: commonStyles.headerDefault
      }
    },
    userNavigator: {
      screen: UserNavigator,
      navigationOptions: {
        header: null,
        gesturesEnabled: false
      }
    },
    drDrawerNavigator: {
      screen: DrDrawerNavigator,
      navigationOptions: {
        gesturesEnabled: false,
        header: null
      }
    },
    fdDrawerNavigator: {
      screen: FronDeskDrawerNavigator,
      navigationOptions: {
        gesturesEnabled: false,
        header: null
      }
    }, 
    resetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        title: RESET_PASSWORD,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerStyle: commonStyles.headerDefault,
        headerLeft: null,
      }
    }
  },
  {
    initialRouteName: VIEW_LOGIN
  }
);

const AppNavigatorContainer = createAppContainer(LoginNavigator);

// class AppNavigator extends React.Component {
//   render() {
//     return <AppNavigatorContainer />;
//   }
// }

export default AppNavigatorContainer;
