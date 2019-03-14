import { combineReducers } from "redux";
import NetworkReducer from "./NetworkReducer";
import TokenReducer from "./TokenReducer";
import CustomerSignupReducer from "./CustomerSignupReducer";
import UserDataReducer from "./UserDataReducer";
import SearchCriteriaReducer from "./SearchCriteriaReducer";
import BookingDateReducer from "./BookingDataReducer";
import FavoritesReducer from "./FavoritesReducer";

export default combineReducers({
  isNetworkConnected: NetworkReducer,
  token: TokenReducer,
  customerData: CustomerSignupReducer,
  userData: UserDataReducer,
  searchCriteria: SearchCriteriaReducer,
  bookingData: BookingDateReducer,
  favorites: FavoritesReducer
});