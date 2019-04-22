import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import commonStyles from '../commons/styles';
import FavoriteDoctors from '../views/FavoriteDoctors';
import DoctorProfile from '../views/DoctorProfile';
import DoctorProfileDescription from '../views/DoctorProfileDescription';
import BookAppointment from '../views/BookAppointment';
import BookingConfirmation from '../views/BookingConfirmation';
import Payment from '../views/Payment';
import BookingHistoryDetail from '../views/BookingHistoryDetail';
import {
  FAVORITES,
  BOOKING_CONFIRMATION,
  PAYMENT,
  BOOKING_HISTORY_DETAIL,
  ABOUT_DOCTOR
} from '../constants/strings';
import { PRIMARY } from '../config/colors';
import { VIEW_HOME_FAVORITES } from '../constants/viewNames';

/**
 * This navigator will be used only for the home screen
 */
const FavoritesNavigator = createStackNavigator(
  {
    homeFavorites: {
      screen: FavoriteDoctors,
      navigationOptions: {
        title: FAVORITES,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    homeFavDoctorProfile: {
      screen: DoctorProfile,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      })
    },
    homeFavDoctorDescription: {
      screen: DoctorProfileDescription,
      navigationOptions: {
        title: ABOUT_DOCTOR,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    homeFavBookAppointment: {
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
    homeFavBoongkiConfirmation: {
      screen: BookingConfirmation,
      navigationOptions: {
        title: BOOKING_CONFIRMATION,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    homeFavPayment: {
      screen: Payment,
      navigationOptions: {
        title: PAYMENT,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    homeFavBookingDetail: {
      screen: BookingHistoryDetail,
      navigationOptions: {
        title: BOOKING_HISTORY_DETAIL,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    }
  },
  {
    initialRouteName: VIEW_HOME_FAVORITES
  }
);

export default createAppContainer(FavoritesNavigator);
