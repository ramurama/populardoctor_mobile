import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import Footer from "../../components/FooterDoctor";
import { DR_CURRENT_BOOKINGS } from "../../constants/strings";
import commonStyles from "../../commons/styles";
import {
  VIEW_DR_CURRENT_BOOKINGS,
  VIEW_DR_NAV_CURRENT_BOOKINGS,
  VIEW_DR_CURRENT_BOOKING_DETAIL
} from "../../constants/viewNames";
import CurrentBookingList from "../../components/CurrentBookingList";
import Spinner from "react-native-loading-spinner-overlay";
import { WHITE } from "../../config/colors";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { isNullOrEmpty, getDateStringIndian } from "../../commons/utils";
import APIService from "../../services/APIService";
import _ from "underscore";

class CurrentBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      bookings: []
    };
  }

  componentDidMount() {
    this.setState({ spinner: true }, () => {
      APIService.getTodaysBookings(this.props.token, bookings => {
        this.setState({ spinner: false }, () => {
          this.props.setCurrentBookings(bookings);
        });
      });
    });
  }

  _findHospitals(hospitals, hospitalDetail) {
    return hospitals.find(hospital => {
      return _.isEqual(hospital, hospitalDetail);
    });
  }

  _renderCurrentBookingListItem(item) {
    return (
      <CurrentBookingList
        hospitalName={item.hospitalName}
        hospitalTime={item.hospitalTime}
        visitorList={item.visitorsList}
        onItemPress={bookingId =>
          this.props.navigation.navigate(VIEW_DR_CURRENT_BOOKING_DETAIL, {
            bookingDetails: item,
            bookingId
          })
        }
      />
    );
  }

  _renderCurrentBookingList() {
    return (
      <FlatList
        data={this.props.currentBookings}
        renderItem={({ item }) => this._renderCurrentBookingListItem(item)}
        keyExtractor={(item, index) => item.hospitalTime}
        extraData={this.props}
      />
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  render() {
    return (
      <Container>
        <Header title={DR_CURRENT_BOOKINGS} {...this.props} />
        <Content style={commonStyles.contentBg}>
          {this._renderCurrentBookingList()}
          {this._renderSpinner()}
        </Content>
        <Footer {...this.props} activeButton={DR_CURRENT_BOOKINGS} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  currentBookings: state.currentBookings
});

export default connect(
  mapStateToProps,
  Actions
)(CurrentBookings);

const styles = StyleSheet.create({});
