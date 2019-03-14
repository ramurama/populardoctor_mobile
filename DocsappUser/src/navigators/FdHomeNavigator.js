import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Schedule from "../views/frontdesk/Schedule";
import FdCurrentBookingNavigator from "../navigators/FdCurrentBookingNavigator";
import FdQRNavigator from "../navigators/FdQRNavigator";

const FdHomeNavigator = createSwitchNavigator(
  {
    fdSchedule: {
      screen: Schedule
    },
    fdCurrentBookingsNav: {
      screen: FdCurrentBookingNavigator
    },
    fdQRNavigator: {
      screen: FdQRNavigator
    }
  }
);

export default createAppContainer(FdHomeNavigator);
