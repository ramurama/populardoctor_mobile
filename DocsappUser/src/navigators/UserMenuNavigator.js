import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import commonStyles from '../commons/styles';
import Menu from '../views/Menu';
import ChangePassword from '../views/ChangePassword';
import CustomerSupport from '../views/CustomerSupport';
import {
  PROFILE,
  CHANGE_PASSWORD,
  CUSTOMER_SUPPORT
} from '../constants/strings';
import { PRIMARY } from '../config/colors';
import { VIEW_HOME_MENU } from '../constants/viewNames';

const UserMenuNavigator = createStackNavigator(
  {
    homeMenu: {
      screen: Menu,
      navigationOptions: {
        title: PROFILE,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    homeMenuChangePassword: {
      screen: ChangePassword,
      navigationOptions: {
        title: CHANGE_PASSWORD,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    },
    homeMenuSupport: {
      screen: CustomerSupport,
      navigationOptions: {
        title: CUSTOMER_SUPPORT,
        headerTitleStyle: commonStyles.headerTitleStyle,
        headerTintColor: PRIMARY,
        headerBackTitle: null,
        headerStyle: commonStyles.headerDefault
      }
    }
  },
  {
    initialRouteName: VIEW_HOME_MENU
  }
);

export default createAppContainer(UserMenuNavigator);
