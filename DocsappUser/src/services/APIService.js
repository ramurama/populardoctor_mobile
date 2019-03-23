import axios from "axios";
import {
  USER_CUSTOMER,
  USER_DOCTOR,
  USER_FRONT_DESK
} from "../constants/userType";
import { isStringsEqual } from "../commons/utils";

// const HOST = "https://docsappdev.herokuapp.com/api/v1";
const HOST = "http://192.168.43.57:5000/api/v1";

//auth
const URL_CUST_AUTH = "/auth/customer";
const URL_DR_AUTH = "/auth/doctor";
const URL_FD_AUTH = "/auth/frontdesk";

//general
const URL_CHANGE_PASSWORD = "/user/changePassword";
const URL_UPDATE_DEVICE_TOKEN = "/user/updateDeviceToken";
const URL_SEND_OTP = "/messages/sendOtp";
const URL_VERIFY_OTP = "/user/verifyOtp";
const URL_MOBILE_NUMBER_EXISTS = "/user/isMobileNumberExists/";
const URL_GET_SUPPORT_DETAILS = "/user/getSupportDetails";
const URL_RESET_PASSWORD = "/user/resetPassword";

//customer
const URL_CUSTOMER_SIGNUP = "/customer/signup";
const URL_GET_INITIAL_DATA = "/customer/getInitialData";
const URL_GET_DOCTORS_LIST = "/customer/getDoctorsList";
const URL_GET_SCHEDULES = "/customer/getSchedules";
const URL_GET_TOKENS = "/customer/getTokens";
const URL_BLOCK_TOKEN = "/customer/blockToken";
const URL_ADD_FAVORITE = "/customer/addFavorite";
const URL_REMOVE_FAVORITE = "/customer/removeFavorite";
const URL_GET_FAVORITES = "/customer/getFavorites";
const URL_BOOK_TOKEN = "/customer/bookToken";
const URL_GET_BOOKING_HISTORY = "/customer/getBookingHistory";

//doctor
const URL_DR_GET_SCHEDULE_CONFIRMATIONS = "/doctor/getNextDayConfirmations";
const URL_DR_CONFIRM_SCHEDULE = "/doctor/confirmSchedule";
const URL_DR_GET_TODAYS_BOOKINGS = "/doctor/getTodaysBookings";
const URL_DR_GET_BOOKING_HISTORY = "/doctor/getBookingHistory";
const URL_DR_GET_BOOKING_DETAIL = "/doctor/getBookingDetail";
const URL_DR_CONFIRM_VISIT = "/doctor/confirmVisit";

export default (APIService = {
  login(username, password, userType, callback) {
    let authURL = "";
    if (isStringsEqual(userType, USER_CUSTOMER)) {
      authURL = URL_CUST_AUTH;
    } else if (isStringsEqual(userType, USER_DOCTOR)) {
      authURL = URL_DR_AUTH;
    } else if (isStringsEqual(userType, USER_FRONT_DESK)) {
      authURL = URL_FD_AUTH;
    }
    console.log("****** API Call to " + HOST + authURL);
    axios
      .post(HOST + authURL, { username, password })
      .then(res => {
        const { status, token, message, userData } = res.data;
        callback(status, token, message, userData);
      })
      .catch(err => {
        callback(false, null, null, null);
        console.log("***** Error logging in!");
        console.log(err.message);
      });
  },

  updateDeviceToken(deviceToken, token, callback) {
    axios
      .post(
        HOST + URL_UPDATE_DEVICE_TOKEN,
        { deviceToken },
        { headers: buildAuthHeader(token) }
      )
      .then(res => {
        callback(res.data.status);
      })
      .catch(err => console.log("Error updating device token! " + err));
  },

  changePassword(passwordData, token, callback) {
    axios
      .post(HOST + URL_CHANGE_PASSWORD, passwordData, {
        headers: buildAuthHeader(token)
      })
      .then(res => {
        callback(res.data.status, res.data.message);
      })
      .catch(err => {
        console.log("***** Error fetching change password response.");
        console.log(err);
      });
  },

  resetPassword(mobile, password, callback) {
    axios
      .put(HOST + URL_RESET_PASSWORD, { mobile, password })
      .then(res => {
        callback(res.data.status, res.data.message);
      })
      .catch(err => {
        console.log("***** Error reseting password. " + err);
      });
  },

  signUpCustomer(customerData, callback) {
    axios
      .post(HOST + URL_CUSTOMER_SIGNUP, customerData)
      .then(res => callback(res.data.status, res.data.message))
      .catch(err => console.log("***** Error signing up customer: " + err));
  },

  sendOtp(mobile, callback) {
    axios
      .post(HOST + URL_SEND_OTP, { mobile })
      .then(res => callback(res.data.status, res.data.message))
      .catch(err => console.log("***** Error sending OTP: " + err));
  },

  verifyOtp(mobile, otp, callback) {
    axios
      .post(HOST + URL_VERIFY_OTP, { mobile, otp })
      .then(res => callback(res.data.status, res.data.message))
      .catch(err => console.log("***** Error verifying OTP: " + err));
  },

  isMobileNumberExists(mobile, callback) {
    axios
      .get(HOST + URL_MOBILE_NUMBER_EXISTS + mobile)
      .then(res => callback(res.data.status))
      .catch(err =>
        console.log("***** Error checking if mobile number exists.")
      );
  },

  getInitialData(token, callback) {
    axios
      .get(HOST + URL_GET_INITIAL_DATA, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data))
      .catch(err => console.log("***** Error fetching search criteria." + err));
  },

  getDoctorsList(token, location, specialization, callback) {
    axios
      .get(
        HOST + URL_GET_DOCTORS_LIST + "/" + location + "/" + specialization,
        {
          headers: buildAuthHeader(token)
        }
      )
      .then(res => callback(res.data))
      .catch(err => console.log("***** Error fetching doctors list. " + err));
  },

  getSchedules(token, userId, callback) {
    axios
      .get(HOST + URL_GET_SCHEDULES + "/" + userId, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data))
      .catch(err => console.log("***** Error fetching schedules. " + err));
  },

  getTokens(token, doctorId, scheduleId, callback) {
    axios
      .get(HOST + URL_GET_TOKENS + "/" + doctorId + "/" + scheduleId, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data))
      .catch(err => console.log("***** Error fetching tokens. " + err));
  },

  blockToken(token, data, callback) {
    axios
      .post(HOST + URL_BLOCK_TOKEN, data, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data))
      .catch(err => console.log("***** Error blocking token. " + err));
  },

  addFavorite(token, userId, callback) {
    axios
      .post(
        HOST + URL_ADD_FAVORITE,
        { userId },
        { headers: buildAuthHeader(token) }
      )
      .then(res => {
        const { status, favorites } = res.data;
        callback(status, favorites);
      })
      .catch(err => console.log("***** Error adding favorite. " + err));
  },

  removeFavorite(token, userId, callback) {
    axios
      .post(
        HOST + URL_REMOVE_FAVORITE,
        { userId },
        { headers: buildAuthHeader(token) }
      )
      .then(res => {
        const { status, favorites } = res.data;
        callback(status, favorites);
      })
      .catch(err => console.log("**** Error removing favorite. " + err));
  },

  getFavorites(token, favorites, callback) {
    axios
      .post(
        HOST + URL_GET_FAVORITES,
        { favorites },
        { headers: buildAuthHeader(token) }
      )
      .then(res => callback(res.data))
      .catch(err => console.log("***** Error fetching favorites. " + err));
  },

  bookToken(token, data, callback) {
    axios
      .post(HOST + URL_BOOK_TOKEN, data, { headers: buildAuthHeader(token) })
      .then(res => callback(res.data))
      .catch(err => console.log("***** Error booking token. " + err));
  },

  getBookingHistory(token, callback) {
    axios
      .get(HOST + URL_GET_BOOKING_HISTORY, { headers: buildAuthHeader(token) })
      .then(res => callback(res.data))
      .catch(err =>
        console.log("***** Error fetching booking history. " + err)
      );
  },

  getNextDayScheduleConfirmations(token, callback) {
    axios
      .get(HOST + URL_DR_GET_SCHEDULE_CONFIRMATIONS, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data))
      .catch(err =>
        console.log("***** Error fetching schedule confirmations. " + err)
      );
  },

  confirmSchedule(token, data, callback) {
    axios
      .post(HOST + URL_DR_CONFIRM_SCHEDULE, data, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data.status))
      .catch(err => console.log("***** Error confirming schedule. " + err));
  },

  getTodaysBookings(token, callback) {
    axios
      .get(HOST + URL_DR_GET_TODAYS_BOOKINGS, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data))
      .catch(err =>
        console.log("***** Error fetching todays bookings. " + err)
      );
  },

  getDoctorBookingHistory(token, callback) {
    axios
      .get(HOST + URL_DR_GET_BOOKING_HISTORY, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data))
      .catch(err =>
        console.log("***** Error fetching doctor's booking history. " + err)
      );
  },

  getDoctorBookingDetail(token, bookingId, callback) {
    console.log(HOST + URL_DR_GET_BOOKING_DETAIL + "/" + bookingId);
    axios
      .get(HOST + URL_DR_GET_BOOKING_DETAIL + "/" + bookingId, {
        headers: buildAuthHeader(token)
      })
      .then(res => callback(res.data))
      .catch(err => console.log("***** Error fetching booking detail. " + err));
  },

  confirmVisitByDoctor(token, bookingId, callback) {
    axios
      .put(
        HOST + URL_DR_CONFIRM_VISIT + "/" + bookingId,
        {},
        { headers: buildAuthHeader(token) }
      )
      .then(res => callback(res.data.status))
      .catch(err => console.log("***** Error confirming visit. " + err));
  },

  getSupportDetails(callback) {
    axios
      .get(HOST + URL_GET_SUPPORT_DETAILS)
      .then(res => callback(res.data))
      .catch(err =>
        console.log("***** Error fetching support details. " + err)
      );
  }
});

function buildAuthHeader(token) {
  return {
    Authorization: "Bearer " + token
  };
}
