import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Container, Content, Text } from 'native-base';
import HistoryCard from '../components/UserHistoryCard';
import { BACKGROUND_1, HELPER_TEXT_COLOR, WHITE } from '../config/colors';
import {
  VIEW_BOOKING_HISTORY_DETAIL,
  VIEW_BOOKING_HISTORY,
  VIEW_HOME_BOOKING_HISTORY_DETAIL
} from '../constants/viewNames';
import { FONT_L } from '../config/fontSize';
import Spinner from 'react-native-loading-spinner-overlay';
import APIService from '../services/APIService';
import { connect } from 'react-redux';
import { getDateString } from '../commons/utils';
import FooterUser from '../components/FooterUser';
import { MY_BOOKINGS } from '../constants/strings';

class BookingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      currentBookings: [],
      pastBookings: []
    };
  }

  componentDidMount() {
    this.setState({ spinner: true }, () => {
      APIService.getBookingHistory(this.props.token, data => {
        const { currentBookings, pastBookings } = data;
        this.setState({ spinner: false, currentBookings, pastBookings });
      });
    });
  }

  _renderCurrentBookingsListItem(item) {
    const showFooter = this.props.navigation.getParam('showFooter');
    const {
      bookingId,
      tokenDate,
      token,
      status,
      scheduleDetails,
      hospitalDetails,
      doctorDetails,
      startTime,
      endTime,
      bookingOtp
    } = item;
    let historyDetailData = {
      bookingId,
      tokenDate: getDateString(new Date(tokenDate)),
      hospital: { ...hospitalDetails },
      startTime,
      endTime,
      doctorName: doctorDetails.fullName,
      specialization: doctorDetails.specialization,
      tokenNumber: token.number,
      tokenTime: token.time,
      tokenType: token.type,
      enableQR: true,
      enableDoneButton: false
    };
    return (
      <HistoryCard
        doctorName={doctorDetails.fullName}
        specialization={doctorDetails.specialization}
        otp={bookingOtp.otp}
        otpVisible={true}
        imageURL={doctorDetails.profileImage}
        hospitalName={hospitalDetails.name}
        hospitalAddress={
          hospitalDetails.address + ' ' + hospitalDetails.pincode
        }
        bookingDate={getDateString(new Date(tokenDate))}
        bookingTime={token.time}
        tokenNumber={token.number}
        tokenType={token.type}
        isCurrent={true}
        onPress={() => {
          this._navigateToDetail(showFooter, historyDetailData);
        }}
      />
    );
  }

  _renderPreviousBookingsListItem(item) {
    const showFooter = this.props.navigation.getParam('showFooter');
    const {
      bookingId,
      tokenDate,
      token,
      status,
      scheduleDetails,
      hospitalDetails,
      doctorDetails,
      startTime,
      endTime,
      bookingOtp
    } = item;
    let historyDetailData = {
      bookingId,
      tokenDate: getDateString(new Date(tokenDate)),
      hospital: { ...hospitalDetails },
      startTime,
      endTime,
      doctorName: doctorDetails.fullName,
      specialization: doctorDetails.specialization,
      tokenNumber: token.number,
      tokenTime: token.time,
      tokenType: token.type,
      enableQR: false,
      enableDoneButton: false
    };
    return (
      <HistoryCard
        doctorName={doctorDetails.fullName}
        specialization={doctorDetails.specialization}
        otpVisible={false}
        imageURL={doctorDetails.profileImage}
        hospitalName={hospitalDetails.name}
        hospitalAddress={
          hospitalDetails.address + ' ' + hospitalDetails.pincode
        }
        bookingDate={getDateString(new Date(tokenDate))}
        bookingTime={token.time}
        tokenNumber={token.number}
        tokenType={token.type}
        isCurrent={false}
        status={status}
        onPress={() => {
          this._navigateToDetail(showFooter, historyDetailData);
        }}
      />
    );
  }

  _navigateToDetail(showFooter, historyDetailData) {
    //if screen opened from home footer
    if (showFooter) {
      this.props.navigation.navigate(VIEW_HOME_BOOKING_HISTORY_DETAIL, {
        ...historyDetailData
      });
    } else {
      this.props.navigation.navigate(VIEW_BOOKING_HISTORY_DETAIL, {
        ...historyDetailData
      });
    }
  }

  _renderCurrentBookingsList() {
    return (
      <FlatList
        data={this.state.currentBookings}
        extraData={this.state}
        keyExtractor={(item, index) => item.bookingId}
        renderItem={({ item }) => this._renderCurrentBookingsListItem(item)}
      />
    );
  }

  _renderPreviousBookingsList() {
    return (
      <FlatList
        data={this.state.pastBookings}
        extraData={this.state}
        keyExtractor={(item, index) => item.bookingId}
        renderItem={({ item }) => this._renderPreviousBookingsListItem(item)}
      />
    );
  }

  _renderCurrentBookingsView() {
    return (
      <View>
        {/* <View style={styles.bookingsTextViewStyle}>
          <Text style={styles.bookingTextStyle}>Current Bookings</Text>
        </View> */}
        <View>{this._renderCurrentBookingsList()}</View>
      </View>
    );
  }

  _renderPreviousBookingsView() {
    return (
      <View>
        <View style={styles.bookingsTextViewStyle}>
          <View style={styles.lineStyle} />
          <View style={styles.textInnerView}>
            <Text style={styles.bookingTextStyle}>Past Appointments</Text>
          </View>
          <View style={styles.lineStyle} />
        </View>
        <View>{this._renderPreviousBookingsList()}</View>
      </View>
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  render() {
    const showFooter = this.props.navigation.getParam('showFooter');
    return (
      <Container>
        <Content padder style={styles.contentStyle}>
          {this._renderCurrentBookingsView()}
          {this._renderPreviousBookingsView()}
          {this._renderSpinner()}
        </Content>
        {showFooter && (
          <FooterUser activeButton={VIEW_BOOKING_HISTORY} {...this.props} />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({ token: state.token });

export default connect(mapStateToProps)(BookingHistory);

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: BACKGROUND_1
  },
  bookingsTextViewStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  bookingTextStyle: {
    fontSize: FONT_L,
    fontWeight: '100',
    color: HELPER_TEXT_COLOR,
    margin: 5,
    flex: 1
  },
  lineStyle: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: HELPER_TEXT_COLOR
  },
  textInnerView: {
    justifyContent: 'center'
  }
});
