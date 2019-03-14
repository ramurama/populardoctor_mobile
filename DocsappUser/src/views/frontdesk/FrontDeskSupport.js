import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import commonStyles from "../../commons/styles";
import { DR_SUPPORT } from "../../constants/strings";

class FrontDeskSupport extends React.Component {
  render() {
    return (
      <Container>
        <Header title={DR_SUPPORT} {...this.props} />
        <Content style={commonStyles.contentBg}>
          <View />
        </Content>
      </Container>
    );
  }
}

export default FrontDeskSupport;

const styles = StyleSheet.create({});
