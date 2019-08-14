import { ACTION_SET_CONFIRMED_SCHEDULES } from "../constants/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_CONFIRMED_SCHEDULES:
      return action.confirmedSchedules;
    default:
      return state;
  }
};
