import { ACTION_SET_DR_BOOKING_HISTORY } from "../constants/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_DR_BOOKING_HISTORY:
      return action.drBookingHistory;
    default:
      return state;
  }
};
