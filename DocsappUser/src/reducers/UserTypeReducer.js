import { ACTION_SET_USER_TYPE } from "../constants/actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case ACTION_SET_USER_TYPE:
      return action.userType;
    default:
      return state;
  }
};
