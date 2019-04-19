import { ACTION_SET_BOOKING_WITHOUT_FEEDBACK } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_SET_BOOKING_WITHOUT_FEEDBACK:
      return action.bookingWithoutFeedback;
    default:
      return state;
  }
};
