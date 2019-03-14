import { ACTION_SET_USER_DATA } from "../constants/actionTypes";
/**
 * fullName
 * mobile
 * gender
 * dateOfBirth
 */
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_SET_USER_DATA:
      return action.userData;
    default:
      return state;
  }
};
