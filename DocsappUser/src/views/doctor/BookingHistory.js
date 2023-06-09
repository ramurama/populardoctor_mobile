import React from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/HeaderDoctor';
import Footer from '../../components/FooterDoctor';
import { DR_BOOKING_HISTORY } from '../../constants/strings';
import commonStyles from '../../commons/styles';
import VisitorHistoryCard from '../../components/VisitorHistoryCard';
import { VIEW_DR_BOOKING_HISTORY_DETAIL } from '../../constants/viewNames';
import { WHITE } from '../../config/colors';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import { isNullOrEmpty, getDateStringIndian } from '../../commons/utils';
import APIService from '../../services/APIService';

class BookingHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      refreshing: false
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
        this.setState({ spinner: false, refreshing: false }, () => {
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
        extraData={this.props}
      />
    );
  }

  _renderBookingHistoryListItem(item) {
    const { tokenDate, userDetails, hospitalDetails } = item;
    const { streetName, building } = JSON.parse(hospitalDetails.address);
    return (
      <VisitorHistoryCard
        visitorName={userDetails.fullName}
        mobile={userDetails.username}
        hospitalName={hospitalDetails.name}
        hospitalAddress={`${building}, ${streetName}`}
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

  _onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this._refreshHistory();
    });
  };

  render() {
    return (
      <Container>
        <Header
          title={DR_BOOKING_HISTORY}
          {...this.props}
          showRefresh="true"
          onRefresh={() => this._refreshHistory()}
        />
        <Content
          style={commonStyles.contentBg}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
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
