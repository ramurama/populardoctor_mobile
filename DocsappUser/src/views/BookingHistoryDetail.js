import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import UserBooking from "../components/UserBooking";
import { TOKEN_FASTTRACK } from '../constants/tokenTypes';

const hospitalName = "XYZ Hospital";
const hospitalAddress = "XYZ Addres, Coimbatore 600 003";
const bookingDay = "Fri 24, Dec";
const hospitalTime = "06:00 PM - 11:00 PM";
const bookingId = "B20190216";
const dataObject = {
  doctor: {
    name: "Loganathan",
    specialist: "Neuro Surgeon"
  }
};

class BookingHistoryDetail extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <UserBooking
            hospitalName={hospitalName}
            hospitalAddress={hospitalAddress}
            bookingDay={bookingDay}
            availableTime={hospitalTime}
            doctorName={dataObject.doctor.name}
            specialization={dataObject.doctor.specialist}
            tokenNumber={"17"}
            bookingTime={"07:15 AM"}
            enableQR={true}
            tokenType={TOKEN_FASTTRACK}
            bookingId={bookingId}
          />
        </Content>
      </Container>
    );
  }
}

export default BookingHistoryDetail;

const styles = StyleSheet.create({});
