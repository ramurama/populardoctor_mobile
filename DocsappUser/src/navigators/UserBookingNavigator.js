import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import BookingHistory from '../views/BookingHistory';
import BookingHistoryDetail from '../views/BookingHistoryDetail';
import commonStyles from '../commons/styles';
import { MY_BOOKINGS, BOOKING_HISTORY_DETAIL } from '../constants/strings';
import { PRIMARY } from '../config/colors';
import { VIEW_HOME_BOOKING_HISTORY } from '../constants/viewNames';

/**
 * This navigator will be used only for the home screen
 */
const UserBookingNavigator = createStackNavigator(
  {
    homeBookingHistory: {
      screen: BookingHistory,
      navigationOptions: {
        title: MY_BOOKINGS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault,
        
      }
    },
    homeBookingHistoryDetail: {
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
  { initialRouteName: VIEW_HOME_BOOKING_HISTORY }
);

export default createAppContainer(UserBookingNavigator);
