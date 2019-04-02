import { ACTION_SET_USER_SUPPORT } from "../constants/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_SET_USER_SUPPORT:
      return action.userSupport;
    default:
      return state;
  }
};
