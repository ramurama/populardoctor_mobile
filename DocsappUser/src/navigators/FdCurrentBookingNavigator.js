import { createAppContainer, createStackNavigator } from "react-navigation";
import { PRIMARY } from "../config/colors";
import commonStyles from "../commons/styles";
import CurrentBookings from "../views/frontdesk/CurrentBookings";
import CurrentBookingDetail from "../views/frontdesk/CurrentBookingDetail";
import { VIEW_FD_CURRENT_BOOKINGS } from "../constants/viewNames";
import { VISITOR_DETAILS } from "../constants/strings";

const DoctorCurrentBookingNavigator = createStackNavigator(
  {
    fdCurrentBookings: {
      screen: CurrentBookings,
      navigationOptions: {
        header: null,
        headerBackTitle: null
      }
    },
    fdCurrentBookingDetail: {
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
    initialRouteName: VIEW_FD_CURRENT_BOOKINGS
  }
);

export default createAppContainer(DoctorCurrentBookingNavigator);
