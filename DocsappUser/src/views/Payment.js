import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Text, Footer } from "native-base";
import { connect } from "react-redux";
import * as Actions from "../actions";
import { SECONDARY, PRIMARY } from "../config/colors";
import { FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";
import APIService from "../services/APIService";

class Payment extends React.Component {
  _handlePayButton = async () => {
    const { token, bookingData } = this.props;
    const { doctorId, scheduleId, tokenDate, tokenNumber } = bookingData;
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
        alert(res.bookingId);
      } else {
        alert("null");
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
        <Footer style={styles.footerStyle}>
          <View style={styles.bookView}>
            <Text style={styles.bookText}>Pay</Text>
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

const styles = StyleSheet.create({
  footerStyle: {
    backgroundColor: SECONDARY
  },
  bookView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  bookText: {
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_BOLD,
    padding: 10,
    color: PRIMARY
  }
});
