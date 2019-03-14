import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import Footer from "../../components/FooterDoctor";
import { DR_BOOKING_HISTORY } from "../../constants/strings";
import commonStyles from "../../commons/styles";
import VisitorHistoryCard from "../../components/VisitorHistoryCard";
import { VIEW_DR_BOOKING_HISTORY_DETAIL } from "../../constants/viewNames";

const tempData = [
  {
    visitorName: "Santhoshsiban",
    mobile: "9876543210",
    hospitalName: "ABC Hospital",
    hostpitalAddress: "Thondamuthur Road, Coimbatore",
    bookingDate: "Dec 23, 2018",
    bookingId: "B123445"
  },
  {
    visitorName: "Ramu Ramasamy",
    mobile: "9876543210",
    hospitalName: "XYZ Hospital",
    hostpitalAddress: "Thondamuthur Road, Coimbatore",
    bookingDate: "Dec 23, 2018",
    bookingId: "B123446"
  },
  {
    visitorName: "Loganathan",
    mobile: "9876543210",
    hospitalName: "ABC Hospital",
    hostpitalAddress: "Thondamuthur Road, Coimbatore",
    bookingDate: "Dec 23, 2018",
    bookingId: "B123447"
  }
];

class BookingHistory extends React.Component {
  _renderBookingHistoryList() {
    return (
      <FlatList
        data={tempData}
        renderItem={({ item }) => this._renderBookingHistoryListItem(item)}
      />
    );
  }

  _renderBookingHistoryListItem(item) {
    return (
      <VisitorHistoryCard
        visitorName={item.visitorName}
        mobile={item.mobile}
        hospitalName={item.hospitalName}
        hospitalAddress={item.hostpitalAddress}
        bookingDate={item.bookingDate}
        onPress={() =>
          this.props.navigation.navigate(VIEW_DR_BOOKING_HISTORY_DETAIL, {
            bookingId: item.bookingId
          })
        }
      />
    );
  }

  render() {
    return (
      <Container>
        <Header title={DR_BOOKING_HISTORY} {...this.props} />
        <Content style={commonStyles.contentBg}>
          <View>{this._renderBookingHistoryList()}</View>
        </Content>
        <Footer {...this.props} activeButton={DR_BOOKING_HISTORY} />
      </Container>
    );
  }
}

export default BookingHistory;

const styles = StyleSheet.create({});
