import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import commonStyles from "../../commons/styles";
import DoctorBooking from "../../components/DoctorBooking";
import { getDateStringIndian, isStringsEqual } from "../../commons/utils";

class CurrentBookingDetail extends React.Component {
  render() {
    const bookingDetails = this.props.navigation.getParam("bookingDetails");
    const bookingId = this.props.navigation.getParam("bookingId");
    const { hospitalName, appointmentDate, visitorsList } = bookingDetails;
    const visitorDetails = visitorsList.find(visitor => {
      return isStringsEqual(bookingId, visitor.bookingId);
    });
    return (
      <Container>
        <Content style={commonStyles.contentBg}>
          <View style={{ flex: 1 }}>
            <DoctorBooking
              bookingDate={getDateStringIndian(new Date(appointmentDate))}
              bookingId={bookingId}
              tokenNumber={visitorDetails.tokenNumber}
              tokenType={visitorDetails.tokenType}
              tokenTime={visitorDetails.tokenTime}
              visitorName={visitorDetails.name}
              visitorMobile={visitorDetails.number}
              hospitalName={hospitalName}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default CurrentBookingDetail;

const styles = StyleSheet.create({});
