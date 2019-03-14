import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { VIEW_DR_BOOKING_HISTORY } from "../constants/viewNames";
import DrBookingHistory from "../views/doctor/BookingHistory";
import DrBookingHistoryDetail from "../views/doctor/BookingHistoryDetail";
import { VISITOR_DETAILS } from "../constants/strings";
import { PRIMARY } from "../config/colors";
import commonStyles from "../commons/styles";

const DrBookingHistoryNavigator = createStackNavigator(
  {
    drBookingHistory: {
      screen: DrBookingHistory,
      navigationOptions: {
        header: null,
        headerBackTitle: null
      }
    },
    drBookingHistoryDetail: {
      screen: DrBookingHistoryDetail,
      navigationOptions: {
        title: VISITOR_DETAILS,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    }
  },
  {
    initialRouteName: VIEW_DR_BOOKING_HISTORY
  }
);

export default createAppContainer(DrBookingHistoryNavigator);
