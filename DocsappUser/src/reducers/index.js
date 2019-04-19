import { combineReducers } from 'redux';
import NetworkReducer from './NetworkReducer';
import TokenReducer from './TokenReducer';
import CustomerSignupReducer from './CustomerSignupReducer';
import UserDataReducer from './UserDataReducer';
import SearchCriteriaReducer from './SearchCriteriaReducer';
import BookingDateReducer from './BookingDataReducer';
import FavoritesReducer from './FavoritesReducer';
import ScheduleConfirmationReducer from './ScheduleConfirmationReducer';
import DrBookingHistoryReducer from './DrBookingHistoryReducer';
import UserSupportReducer from './UserSupportReducer';
import CurrentBookingsReducer from './CurrentBookingsReducer';
import IsPremiumUserReducer from './IsPremiumUserReducer';
import ConfirmedSchedulesReducer from './ConfirmedSchedulesReducer';
import LocationReducer from './LocationReducer';
import LocationListReducer from './LocationsListReducer';
import SpecializationsReducer from './SpecializationsReducer';
import ReceivedInitialDataReducer from './ReceivedInitialDataReducer';
import BookingWithoutFeedbackReducer from './BookingWithoutFeedbackReducer';

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
  confirmedSchedules: ConfirmedSchedulesReducer,
  location: LocationReducer,
  locationList: LocationListReducer,
  specializations: SpecializationsReducer,
  receivedInitialData: ReceivedInitialDataReducer,
  bookingWithoutFeedback: BookingWithoutFeedbackReducer
});
