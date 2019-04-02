import { ACTION_SET_SCHEDULE_CONFIRMATION_DATA } from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_SET_SCHEDULE_CONFIRMATION_DATA:
      return action.scheduleConfirmations;
    default:
      return state;
  }
};
