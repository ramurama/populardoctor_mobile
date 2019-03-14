import { ACTION_SET_NETWORK_CONN_STATUS } from "../constants/actionTypes";

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_SET_NETWORK_CONN_STATUS:
      return action.isNetworkConnected;
    default:
      return state;
  }
};
