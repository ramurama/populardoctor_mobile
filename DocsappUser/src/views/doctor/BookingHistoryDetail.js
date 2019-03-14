import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import commonStyles from "../../commons/styles";
import DoctorBooking from "../../components/DoctorBooking";

class BookignHistoryDetail extends React.Component {
  render() {
    return (
      <Container>
        <Content style={commonStyles.contentBg}>
          <DoctorBooking
            bookingDate="Feb 17, 2019"
            bookingId={this.props.navigation.getParam("bookingId")}
            tokenNumber="2"
            tokenTime="10:00 AM - 11:00 AM"
            visitorName="Ramu Ramasamy"
            visitorMobile="9894130821"
          />
        </Content>
      </Container>
    );
  }
}

export default BookignHistoryDetail;

const styles = StyleSheet.create({});
