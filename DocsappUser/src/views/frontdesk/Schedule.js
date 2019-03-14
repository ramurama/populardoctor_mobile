import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import Footer from "../../components/FooterFrontDesk";
import { DR_SCHEDULE } from "../../constants/strings";
import commonStyles from "../../commons/styles";
import { VIEW_DR_SCHEDULE } from "../../constants/viewNames";

class Schedule extends React.Component {
  render() {
    return (
      <Container>
        <Header title={DR_SCHEDULE} {...this.props} sourceRoute={VIEW_DR_SCHEDULE} />
        <Content style={commonStyles.contentBg}>
          <View />
        </Content>
        <Footer {...this.props} activeButton={DR_SCHEDULE} />
      </Container>
    );
  }
}

export default Schedule;

const styles = StyleSheet.create({});
