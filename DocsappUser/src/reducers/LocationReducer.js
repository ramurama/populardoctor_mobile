import { ACTION_SET_LOCATION } from "../constants/actionTypes";

export default (state = "", action) => {
  switch (action.type) {
    case ACTION_SET_LOCATION:
      return action.location;
    default:
      return state;
  }
};
