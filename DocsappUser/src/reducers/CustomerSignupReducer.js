import { ACTION_SET_CUSTOMER_SIGNUP_DATA } from "../constants/actionTypes";

/**
 * this reducer will contain the following data
 * 
 *        fullName,
 *        dateOfBirth,
 *        gender,
 *        mobile,
 *        password
 */
export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_SET_CUSTOMER_SIGNUP_DATA:
      return action.customerData;
    default:
      return state;
  }
};
