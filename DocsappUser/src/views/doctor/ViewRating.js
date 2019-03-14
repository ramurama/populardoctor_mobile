import React from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text } from "native-base";
import Header from "../../components/HeaderDoctor";
import commonStyles from "../../commons/styles";
import { DR_MY_RATING } from "../../constants/strings";
import RatingCard from "../../components/RatingCard";
import * as Animatable from "react-native-animatable";

class ViewRating extends React.Component {
  render() {
    return (
      <Container>
        <Header title={DR_MY_RATING} {...this.props} />
        <Content scrollEnabled={false} style={commonStyles.contentBg}>
          <View style={styles.mainView}>
            <View style={styles.flexRow}>
              <Animatable.View animation="slideInRight">
                <RatingCard title="Trust" rating="3.5" />
              </Animatable.View>
              <Animatable.View animation="slideInLeft">
                <RatingCard title="Popularity" rating="4.5" />
              </Animatable.View>
            </View>
            <View style={styles.flexRow}>
              <Animatable.View animation="slideInUp">
                <RatingCard title="Schedule" rating="4.0" />
              </Animatable.View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default ViewRating;

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: "row"
  },
  mainView: {
    alignItems: "center",
    marginTop: 10
  }
});
