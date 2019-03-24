import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import Footer from "../../components/FooterDoctor";
import { DR_BOOKING_HISTORY } from "../../constants/strings";
import commonStyles from "../../commons/styles";
import VisitorHistoryCard from "../../components/VisitorHistoryCard";
import { VIEW_DR_BOOKING_HISTORY_DETAIL } from "../../constants/viewNames";
import { WHITE } from "../../config/colors";
import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import * as Actions from "../../actions";
import { isNullOrEmpty, getDateStringIndian } from "../../commons/utils";
import APIService from "../../services/APIService";

class BookingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
    if (isNullOrEmpty(this.props.drBookingHistory)) {
      this._refreshHistory();
    }
  }

  _refreshHistory() {
    const { setDoctorBookingHistory, token } = this.props;
    this.setState({ spinner: true }, () => {
      APIService.getDoctorBookingHistory(token, bookings => {
        this.setState({ spinner: false }, () => {
          setDoctorBookingHistory(bookings);
        });
      });
    });
  }

  _renderBookingHistoryList() {
    return (
      <FlatList
        data={this.props.drBookingHistory}
        renderItem={({ item }) => this._renderBookingHistoryListItem(item)}
        keyExtractor={(item, index) => item.bookingId}
      />
    );
  }

  _renderBookingHistoryListItem(item) {
    const { bookingId, tokenDate, userDetails, hospitalDetails } = item;
    return (
      <VisitorHistoryCard
        visitorName={userDetails.fullName}
        mobile={userDetails.username}
        hospitalName={hospitalDetails.name}
        hospitalAddress={hospitalDetails.address}
        bookingDate={getDateStringIndian(new Date(tokenDate))}
        onPress={() =>
          this.props.navigation.navigate(VIEW_DR_BOOKING_HISTORY_DETAIL, {
            bookingDetails: item
          })
        }
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
        <Header
          title={DR_BOOKING_HISTORY}
          {...this.props}
          showRefresh="true"
          onRefresh={() => this._refreshHistory()}
        />
        <Content style={commonStyles.contentBg}>
          <View>{this._renderBookingHistoryList()}</View>
          {this._renderSpinner()}
        </Content>
        <Footer {...this.props} activeButton={DR_BOOKING_HISTORY} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  drBookingHistory: state.drBookingHistory
});

export default connect(
  mapStateToProps,
  Actions
)(BookingHistory);

const styles = StyleSheet.create({});
