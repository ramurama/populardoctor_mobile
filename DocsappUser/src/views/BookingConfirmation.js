import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Container, Content, Text, Footer } from "native-base";
import { SECONDARY, PRIMARY, HELPER_TEXT_COLOR, WHITE } from "../config/colors";
import UserBooking from "../components/UserBooking";
import { FONT_L } from "../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";
import { connect } from "react-redux";
import * as Actions from "../actions";
import { VIEW_PAYMENT } from "../constants/viewNames";
import Spinner from "react-native-loading-spinner-overlay";
import APIService from "../services/APIService";
import { isNullOrEmpty } from "../commons/utils";
import commonStyles from "../commons/styles";

class BookingConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  _handleConfirmButton = () => {
    this.setState({ spinner: true }, () => {
      const {
        doctorId,
        scheduleId,
        tokenNumber,
        tokenDate
      } = this.props.bookingData;
      console.log(tokenDate);
      const data = {
        doctorId,
        scheduleId,
        tokenNumber,
        tokenDate
      };
      console.log(data);
      APIService.blockToken(this.props.token, data, res => {
        this.setState({ spinner: false }, () => {
          setTimeout(() => {
            if (res.status) {
              this.props.navigation.navigate(VIEW_PAYMENT);
            } else {
              if (!isNullOrEmpty(res.message)) {
                Alert.alert("Try Again!", res.message);
              }
            }
          }, 100);
        });
      });
    });
  };

  _renderFooterConfirmButton() {
    return (
      <TouchableOpacity onPress={this._handleConfirmButton}>
        <Footer style={commonStyles.footerButtonStyle}>
          <View style={commonStyles.footerButtonView}>
            <Text style={commonStyles.footerButtonText}>Confirm</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  render() {
    const {
      tokenTime,
      tokenType,
      tokenNumber,
      hospital,
      doctorName,
      specialization,
      weekday,
      startTime,
      endTime
    } = this.props.bookingData;
    return (
      <Container>
        <Content>
          <UserBooking
            hospitalName={hospital.name}
            hospitalAddress={hospital.address + " " + hospital.pincode}
            bookingDay={weekday}
            availableTime={startTime + " - " + endTime}
            doctorName={doctorName}
            specialization={specialization}
            tokenNumber={tokenNumber}
            bookingTime={tokenTime}
            enableQR={false}
            tokenType={tokenType}
            bookingId={null}
          />
          {this._renderSpinner()}
        </Content>
        {this._renderFooterConfirmButton()}
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
)(BookingConfirmation);

const styles = StyleSheet.create({});
