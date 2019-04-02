import { combineReducers } from "redux";
import NetworkReducer from "./NetworkReducer";
import TokenReducer from "./TokenReducer";
import CustomerSignupReducer from "./CustomerSignupReducer";
import UserDataReducer from "./UserDataReducer";
import SearchCriteriaReducer from "./SearchCriteriaReducer";
import BookingDateReducer from "./BookingDataReducer";
import FavoritesReducer from "./FavoritesReducer";
import ScheduleConfirmationReducer from "./ScheduleConfirmationReducer";
import DrBookingHistoryReducer from "./DrBookingHistoryReducer";
import UserSupportReducer from "./UserSupportReducer";
import CurrentBookingsReducer from "./CurrentBookingsReducer";
import IsPremiumUserReducer from "./IsPremiumUserReducer";
import ConfirmedSchedulesReducer from "./ConfirmedSchedulesReducer";

export default combineReducers({
  isNetworkConnected: NetworkReducer,
  token: TokenReducer,
  customerData: CustomerSignupReducer,
  userData: UserDataReducer,
  searchCriteria: SearchCriteriaReducer,
  bookingData: BookingDateReducer,
  favorites: FavoritesReducer,
  scheduleConfirmations: ScheduleConfirmationReducer,
  drBookingHistory: DrBookingHistoryReducer,
  userSupport: UserSupportReducer,
  currentBookings: CurrentBookingsReducer,
  isPremiumUser: IsPremiumUserReducer,
  confirmedSchedules: ConfirmedSchedulesReducer
});
