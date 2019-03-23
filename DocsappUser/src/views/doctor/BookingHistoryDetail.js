import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content } from "native-base";
import commonStyles from "../../commons/styles";
import DoctorBooking from "../../components/DoctorBooking";
import { getDateStringIndian } from "../../commons/utils";

class BookignHistoryDetail extends React.Component {
  render() {
    const bookingDetails = this.props.navigation.getParam("bookingDetails");
    const {
      tokenDate,
      token,
      startTime,
      endTime,
      userDetails,
      hospitalDetails,
      bookingId
    } = bookingDetails;
    return (
      <Container>
        <Content style={commonStyles.contentBg}>
          <DoctorBooking
            bookingDate={getDateStringIndian(new Date(tokenDate))}
            bookingId={bookingId}
            tokenNumber={token.number}
            tokenType={token.type}
            tokenTime={token.time}
            visitorName={userDetails.fullName}
            visitorMobile={userDetails.username}
            hospitalName={hospitalDetails.name}
          />
        </Content>
      </Container>
    );
  }
}

export default BookignHistoryDetail;

const styles = StyleSheet.create({});
