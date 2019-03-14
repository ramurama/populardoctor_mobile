import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Schedule from "../views/doctor/Schedule";
import DrCurrentBookingNavigator from "./DrCurrentBookingNavigator";
import DrBookingHistoryNavigator from "./DrBookingHistoryNavigator";
import { VIEW_DR_SCHEDULE } from "../constants/viewNames";
import DrQRNavigator from "./DrQRNavigator";

const DoctorNavigatorSwitch = createSwitchNavigator(
  {
    drSchedule: {
      screen: Schedule
    },
    drCurrentBookingsNav: {
      screen: DrCurrentBookingNavigator
    },
    drBookingHistoryNav: {
      screen: DrBookingHistoryNavigator
    },
    drQRNavigator: {
      screen: DrQRNavigator
    }
  },
  {
    initialRouteName: VIEW_DR_SCHEDULE
  }
);

const DoctorNavigator = createAppContainer(DoctorNavigatorSwitch);
export default DoctorNavigator;
