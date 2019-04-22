import { ACTION_SET_USER_PAST_BOOKINGS } from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_USER_PAST_BOOKINGS:
      return action.userPastBookings;
    default:
      return state;
  }
};
