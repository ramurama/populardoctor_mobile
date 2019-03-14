import React from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import Drawer from "../views/doctor/Drawer";
import DrHomeNavigator from "./DrHomeNavigator";
import ChangePassword from "../views/ChangePassword";
import ViewRating from "../views/doctor/ViewRating";
import DoctorSupport from "../views/doctor/DoctorSupport";

const DrDrawerNavigator = createDrawerNavigator(
  {
    drNavigator: {
      screen: DrHomeNavigator
    },
    drChangePassword: {
      screen: ChangePassword
    },
    drRating: {
      screen: ViewRating
    },
    drSupport: {
      screen: DoctorSupport
    }
  },
  {
    contentComponent: props => <Drawer {...props} />
  }
);

export default createAppContainer(DrDrawerNavigator);
