import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Container, Content, Text } from "native-base";
import commonStyles from "../commons/styles";
import HistoryCard from "../components/UserHistoryCard";
import { BACKGROUND_1, HELPER_TEXT_COLOR } from "../config/colors";
import { VIEW_BOOKING_HISTORY_DETAIL } from "../constants/viewNames";
import { FONT_L } from "../config/fontSize";

const tempCurrentBookingsData = [
  {
    doctorName: "Ramu Ramasamy",
    specialization: "Neurologist",
    otp: "5597",
    otpVisible: true,
    imageURL:
      "https://pbs.twimg.com/profile_images/979315748693659648/6SwLXRt__400x400.jpg",
    hospitalName: "PSG Multi Speciality Hospital",
    hospitalAddress: "Karapakkam, OMR, Chennai - 97.",
    bookingDate: "Jan 2, 2019",
    bookingTime: "11:00 AM to 12:00 PM",
    tokenNumber: "13"
  },
  {
    doctorName: "Santhoshsivan Balanagarajan",
    specialization: "Orthologist",
    otp: "4283",
    otpVisible: true,
    imageURL:
      "https://pbs.twimg.com/profile_images/979315748693659648/6SwLXRt__400x400.jpg",
    hospitalName: "Apollo Hospital",
    hospitalAddress: "Kandhanchavadi, OMR, Chennai - 97.",
    bookingDate: "Jan 2, 2019",
    bookingTime: "07:00 PM to 08:00 PM",
    tokenNumber: "4"
  }
];

const tempPreviousBookingsData = [
  {
    doctorName: "Ramu Ramasamy",
    specialization: "Neurologist",
    otp: "5597",
    otpVisible: false,
    imageURL:
      "https://pbs.twimg.com/profile_images/979315748693659648/6SwLXRt__400x400.jpg",
    hospitalName: "PSG Multi Speciality Hospital",
    hospitalAddress: "Karapakkam, OMR, Chennai - 97.",
    bookingDate: "Jan 2, 2019",
    bookingTime: "11:00 AM to 12:00 PM",
    tokenNumber: "24"
  },
  {
    doctorName: "Santhoshsivan Balanagarajan",
    specialization: "Orthologist",
    otp: "4283",
    otpVisible: false,
    imageURL:
      "https://pbs.twimg.com/profile_images/979315748693659648/6SwLXRt__400x400.jpg",
    hospitalName: "Apollo Hospital",
    hospitalAddress: "Kandhanchavadi, OMR, Chennai - 97.",
    bookingDate: "Jan 2, 2019",
    bookingTime: "07:00 PM to 08:00 PM",
    tokenNumber: "7"
  }
];

class BookingHistory extends React.Component {
  _renderCurrentBookingsListItem(item) {
    return (
      <HistoryCard
        doctorName={item.doctorName}
        specialization={item.specialization}
        otp={item.otp}
        otpVisible={item.otpVisible}
        imageURL={item.imageURL}
        hospitalName={item.hospitalName}
        hospitalAddress={item.hospitalAddress}
        bookingDate={item.bookingDate}
        bookingTime={item.bookingTime}
        tokenNumber={item.tokenNumber}
        isCurrent={true}
        onPress={this._handleHistoryCardPress}
      />
    );
  }

  _handleHistoryCardPress = () => {
    this.props.navigation.navigate(VIEW_BOOKING_HISTORY_DETAIL);
  };

  _renderPreviousBookingsListItem(item) {
    return (
      <HistoryCard
        doctorName={item.doctorName}
        specialization={item.specialization}
        otp={item.otp}
        otpVisible={item.otpVisible}
        imageURL={item.imageURL}
        hospitalName={item.hospitalName}
        hospitalAddress={item.hospitalAddress}
        bookingDate={item.bookingDate}
        bookingTime={item.bookingTime}
        tokenNumber={item.tokenNumber}
        isCurrent={false}
        onPress={this._handleHistoryCardPress}
      />
    );
  }

  _renderCurrentBookingsList() {
    return (
      <FlatList
        data={tempCurrentBookingsData}
        renderItem={({ item }) => this._renderCurrentBookingsListItem(item)}
      />
    );
  }

  _renderPreviousBookingsList() {
    return (
      <FlatList
        data={tempPreviousBookingsData}
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

  render() {
    return (
      <Container>
        <Content padder style={styles.contentStyle}>
          {this._renderCurrentBookingsView()}
          {this._renderPreviousBookingsView()}
        </Content>
      </Container>
    );
  }
}

export default BookingHistory;

const styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: BACKGROUND_1
  },
  bookingsTextViewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  bookingTextStyle: {
    fontSize: FONT_L,
    fontWeight: "100",
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
    justifyContent: "center"
  }
});
