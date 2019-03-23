import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import commonStyles from "../commons/styles";
import { HELPER_TEXT_COLOR } from "../config/colors";
import { FONT_L } from "../config/fontSize";

class DoctorProfileDescription extends React.Component {
  render() {
    return (
      <Container>
        <Content padder>
          <View style={{ marginTop: 15 }}>
            <Text
              style={{
                color: HELPER_TEXT_COLOR,
                fontSize: FONT_L,
                textAlign: "justify"
              }}
            >
              {this.props.navigation.getParam("profileContent")}
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default DoctorProfileDescription;

const styles = StyleSheet.create({});
