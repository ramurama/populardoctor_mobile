import React from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import Drawer from "../views/frontdesk/Drawer";
import FdHomeNavigator from "./FdHomeNavigator";
import ChangePassword from "../views/ChangePassword";
import FrontDeskSupport from "../views/frontdesk/FrontDeskSupport";

const FdDrawerNavigator = createDrawerNavigator(
  {
    fdNavigator: {
      screen: FdHomeNavigator
    },
    fdChangePassword: {
      screen: ChangePassword
    },
    fdSupport: {
      screen: FrontDeskSupport
    }
  },
  {
    contentComponent: props => <Drawer {...props} />
  }
);

export default createAppContainer(FdDrawerNavigator);
