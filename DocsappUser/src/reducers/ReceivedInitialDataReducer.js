import { ACTION_SET_RECEIVED_INITIAL_DATA } from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_SET_RECEIVED_INITIAL_DATA:
      return action.receivedInitialData;
    default:
      return state;
  }
};
