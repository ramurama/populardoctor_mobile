import { createAppContainer, createStackNavigator } from "react-navigation";
import { PRIMARY } from "../config/colors";
import commonStyles from "../commons/styles";
import CurrentBookings from "../views/doctor/CurrentBookings";
import CurrentBookingDetail from "../views/doctor/CurrentBookingDetail";
import { VIEW_DR_CURRENT_BOOKINGS } from "../constants/viewNames";
import { VISITOR_DETAILS } from "../constants/strings";

const DoctorCurrentBookingNavigator = createStackNavigator(
  {
    drCurrentBookings: {
      screen: CurrentBookings,
      navigationOptions: {
        header: null,
        headerBackTitle: null
      }
    },
    drCurrentBookingDetail: {
      screen: CurrentBookingDetail,
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
    initialRouteName: VIEW_DR_CURRENT_BOOKINGS
  }
);

export default createAppContainer(DoctorCurrentBookingNavigator);
