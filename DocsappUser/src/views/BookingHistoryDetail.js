import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Text, Footer } from "native-base";
import UserBooking from "../components/UserBooking";
import commonStyles from "../commons/styles";
import { VIEW_SEARCH, VIEW_NAV_USER } from "../constants/viewNames";

class BookingHistoryDetail extends React.Component {
  _renderFooterDoneButton() {
    return (
      <TouchableOpacity onPress={this._handleDoneButton}>
        <Footer style={commonStyles.footerButtonStyle}>
          <View style={commonStyles.footerButtonView}>
            <Text style={commonStyles.footerButtonText}>Done</Text>
          </View>
        </Footer>
      </TouchableOpacity>
    );
  }

  _handleDoneButton = () => {
    this.props.navigation.navigate(VIEW_SEARCH);
  };

  render() {
    const { getParam } = this.props.navigation;
    const { name, address, pincode } = getParam("hospital");
    return (
      <Container>
        <Content>
          <UserBooking
            hospitalName={name}
            hospitalAddress={address + " " + pincode}
            bookingDay={getParam("tokenDate")}
            availableTime={getParam("startTime") + " - " + getParam("endTime")}
            doctorName={getParam("doctorName")}
            specialization={getParam("specialization")}
            tokenNumber={getParam("tokenNumber")}
            bookingTime={getParam("tokenTime")}
            enableQR={getParam("enableQR")}
            tokenType={getParam("tokenType")}
            bookingId={getParam("bookingId")}
          />
        </Content>
        {getParam("enableDoneButton") && this._renderFooterDoneButton()}
      </Container>
    );
  }
}

export default BookingHistoryDetail;

const styles = StyleSheet.create({});
