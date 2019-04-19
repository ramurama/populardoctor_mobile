import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Footer } from 'native-base';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { SECONDARY, PRIMARY } from '../config/colors';
import { FONT_L } from '../config/fontSize';
import { FONT_WEIGHT_BOLD } from '../config/fontWeight';
import APIService from '../services/APIService';
import {
  VIEW_BOOKING_HISTORY_DETAIL,
  VIEW_HOME_FAV_BOOKING_DETAIL
} from '../constants/viewNames';
import commonStyles from '../commons/styles';

class Payment extends React.Component {
  _handlePayButton = async () => {
    const screenOpenedFromHome = this.props.navigation.getParam(
      'screenOpenedFromHome'
    );
    const { token, bookingData } = this.props;
    const {
      doctorId,
      scheduleId,
      tokenDate,
      tokenNumber,
      tokenTime,
      doctorName,
      specialization,
      startTime,
      endTime,
      hospital,
      tokenType
    } = bookingData;
    const location = await this._getGeoLocation();
    const latLng = [location.latitude, location.longitude];
    const data = {
      doctorId,
      scheduleId,
      tokenDate,
      tokenNumber,
      latLng
    };
    APIService.bookToken(token, data, res => {
      if (res.status) {
        let bookingDetailView = VIEW_BOOKING_HISTORY_DETAIL;
        if (screenOpenedFromHome) {
          bookingDetailView = VIEW_HOME_FAV_BOOKING_DETAIL;
        }
        this.props.navigation.navigate(bookingDetailView, {
          enableQR: true,
          bookingId: res.bookingId,
          tokenNumber,
          tokenDate,
          tokenTime,
          doctorName,
          specialization,
          startTime,
          endTime,
          hospital,
          tokenType,
          enableDoneButton: true,
          screenOpenedFromHome
        });
      } else {
        // alert('null');
      }
    });
  };

  _getGeoLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position.coords),
        err => reject(err),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  }

  _renderFooterPayButton() {
    return (
      <TouchableOpacity onPress={this._handlePayButton}>
        <Footer style={commonStyles.footerButtonStyle}>
          <View style={commonStyles.footerButtonView}>
            <Text style={commonStyles.footerButtonText}>Pay</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <View />
        </Content>
        {this._renderFooterPayButton()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  bookingData: state.bookingData
});

export default connect(
  mapStateToProps,
  Actions
)(Payment);

const styles = StyleSheet.create({});
