import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import Footer from "../../components/FooterFrontDesk";
import { DR_CURRENT_BOOKINGS } from "../../constants/strings";
import commonStyles from "../../commons/styles";
import { VIEW_FD_CURRENT_BOOKING_DETAIL } from "../../constants/viewNames";
import CurrentBookingList from "../../components/CurrentBookingList";

const tempData = [
  {
    hospitalName: "ABC Hospital",
    hospitalTime: "08:00 AM to 12:00 PM",
    visitorsList: [
      {
        name: "Santhoshsivan",
        number: "8056677845",
        tokenNumber: "6",
        bookingID: "1"
      },
      {
        name: "Logu",
        number: "8056677845",
        tokenNumber: "7",
        bookingID: "2"
      }
    ]
  },
  {
    hospitalName: "EFG Hospital",
    hospitalTime: "02:00 PM to 06:00 PM",
    visitorsList: [
      {
        name: "Santhoshsivan",
        number: "8056677845",
        tokenNumber: "6",
        bookingID: "1"
      },
      {
        name: "Logu",
        number: "8056677845",
        tokenNumber: "7",
        bookingID: "2"
      }
    ]
  },
  {
    hospitalName: "XYZ Hospital",
    hospitalTime: "07:00 PM to 10:00 PM",
    visitorsList: [
      {
        name: "Santhoshsivan",
        number: "8056677845",
        tokenNumber: "6",
        bookingID: "1"
      },
      {
        name: "Logu",
        number: "8056677845",
        tokenNumber: "7",
        bookingID: "2"
      }
    ]
  }
];

class CurrentBookings extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderCurrentBookingListItem(item) {
    return (
      <CurrentBookingList
        hospitalName={item.hospitalName}
        hospitalTime={item.hospitalTime}
        visitorList={item.visitorsList}
        onItemPress={() =>
          this.props.navigation.navigate(VIEW_FD_CURRENT_BOOKING_DETAIL)
        }
      />
    );
  }

  _renderCurrentBookingList() {
    return (
      <FlatList
        data={tempData}
        renderItem={({ item }) => this._renderCurrentBookingListItem(item)}
      />
    );
  }

  render() {
    return (
      <Container>
        <Header title={DR_CURRENT_BOOKINGS} {...this.props} />
        <Content style={commonStyles.contentBg}>
          {this._renderCurrentBookingList()}
        </Content>
        <Footer {...this.props} activeButton={DR_CURRENT_BOOKINGS} />
      </Container>
    );
  }
}

export default CurrentBookings;

const styles = StyleSheet.create({});
