import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from '../views/Home';
import FavoriteDoctors from '../views/FavoriteDoctors';
import UserNavigator from './UserNavigator';
import BookingHistory from '../views/BookingHistory';
import Menu from '../views/Menu';
import { VIEW_HOME } from '../constants/viewNames';

const UserHomeNavigator = createSwitchNavigator(
  {
    userHome: {
      screen: Home
    },
    homeFavorites: {
      screen: FavoriteDoctors
    },
    userNavigator: {
      screen: UserNavigator,
      navigationOptions: {
        header: null
      }
    },
    homeBookingHistory: {
      screen: BookingHistory
    },
    homeMenu: {
      screen: Menu
    }
  },
  {
    initialRouteName: VIEW_HOME
  }
);

export default createAppContainer(UserHomeNavigator);
