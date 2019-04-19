import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from '../views/Home';
import FavoritesNavigator from './FavoritesNavigator';
import UserNavigator from './UserNavigator';
import UserBookingNavigator from './UserBookingNavigator';
import UserMenuNavigator from './UserMenuNavigator';
import { VIEW_HOME } from '../constants/viewNames';

const UserHomeNavigator = createSwitchNavigator(
  {
    userHome: {
      screen: Home
    },
    homeFavoritesNavigator: {
      screen: FavoritesNavigator
    },
    userNavigator: {
      screen: UserNavigator,
      navigationOptions: {
        header: null
      }
    },
    homeBookingHistoryNavigator: {
      screen: UserBookingNavigator
    },
    homeMenuNavigator: {
      screen: UserMenuNavigator
    }
  },
  {
    initialRouteName: VIEW_HOME
  }
);

export default createAppContainer(UserHomeNavigator);
