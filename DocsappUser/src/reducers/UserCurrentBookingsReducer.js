import { ACTION_SET_USER_CURRENT_BOOKINGS } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_USER_CURRENT_BOOKINGS:
      return action.userCurrentBookings;
    default:
      return state;
  }
};
