import { ACTION_SET_CURRENT_BOOKINGS } from "../constants/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_CURRENT_BOOKINGS:
      return action.currentBookings;
    default:
      return state;
  }
};
