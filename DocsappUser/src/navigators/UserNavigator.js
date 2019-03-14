import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Icon } from "native-base";
import Search from "../views/Search";
import { VIEW_SEARCH, VIEW_MENU } from "../constants/viewNames";
import { SECONDARY_DARK, PRIMARY } from "../config/colors";
import {
  LOCATION,
  PROFILE,
  MY_BOOKINGS,
  BOOK_APPOINTMENT,
  BOOKING_CONFIRMATION,
  CHANGE_PASSWORD,
  FAVORITES,
  BOOKING_HISTORY_DETAIL,
  ABOUT_DOCTOR,
  CUSTOMER_SUPPORT,
  PAYMENT
} from "../constants/strings";
import Login from "../views/Login";
import Menu from "../views/Menu";
import SearchDoctor from "../views/SearchDoctor";
import commonStyles from "../commons/styles";
import BookingHistory from "../views/BookingHistory";
import DoctorProfile from "../views/DoctorProfile";
import BookAppointment from "../views/BookAppointment";
import BookingConfirmation from "../views/BookingConfirmation";
import ChangePassword from "../views/ChangePassword";
import FavoriteDoctors from "../views/FavoriteDoctors";
import BookingHistoryDetail from "../views/BookingHistoryDetail";
import DoctorProfileDescription from "../views/DoctorProfileDescription";
import CustomerSupport from "../views/CustomerSupport";
import Payment from "../views/Payment";
import { icons } from "../constants/icons";

const UserNavigatorStack = createStackNavigator(
  {
    search: {
      screen: Search,
      navigationOptions: {
        header: null,
        headerBackTitle: null
      }
    },
    searchDoctor: {
      screen: SearchDoctor,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      })
    },
    menu: {
      screen: Menu,
      navigationOptions: {
        title: PROFILE,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    bookingHistory: {
      screen: BookingHistory,
      navigationOptions: {
        title: MY_BOOKINGS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    changePassword: {
      screen: ChangePassword,
      navigationOptions: {
        title: CHANGE_PASSWORD,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerStyle: commonStyles.headerDefault
      }
    },
    doctorProfile: {
      screen: DoctorProfile,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      })
    },
    bookAppointment: {
      screen: BookAppointment,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        tokenType: `${navigation.state.params.tokenType}`
      })
    },
    bookingConfirmation: {
      screen: BookingConfirmation,
      navigationOptions: {
        title: BOOKING_CONFIRMATION,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    favorites: {
      screen: FavoriteDoctors,
      navigationOptions: {
        title: FAVORITES,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    bookingHistoryDetail: {
      screen: BookingHistoryDetail,
      navigationOptions: {
        title: BOOKING_HISTORY_DETAIL,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    doctorProfileDescription: {
      screen: DoctorProfileDescription,
      navigationOptions: {
        title: ABOUT_DOCTOR,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    customerSupport: {
      screen: CustomerSupport,
      navigationOptions: {
        title: CUSTOMER_SUPPORT,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    payment: {
      screen: Payment,
      navigationOptions: {
        title: PAYMENT,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    }
  },
  {
    initialRouteName: VIEW_SEARCH
  }
);

const UserNavigationContainer = createAppContainer(UserNavigatorStack);

// class UserNavigator extends React.Component {
//   render() {
//     return <UserNavigationContainer />;
//   }
// }

export default UserNavigationContainer;
