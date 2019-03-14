import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import commonStyles from "../../commons/styles";
import DoctorBooking from "../../components/DoctorBooking";

class CurrentBookingDetail extends React.Component {
  render() {
    return (
      <Container>
        <Content style={commonStyles.contentBg}>
          <View style={{ flex: 1 }}>
            <DoctorBooking
              bookingDate="Feb 17, 2019"
              bookingId="B20190217"
              tokenNumber="2"
              tokenTime="10:00 AM - 11:00 AM"
              visitorName="Ramu Ramasamy"
              visitorMobile="9894130821"
            />
          </View>
        </Content>
      </Container>
    );
  }
}

export default CurrentBookingDetail;

const styles = StyleSheet.create({});
