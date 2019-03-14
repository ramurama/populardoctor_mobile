import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import PropTypes from "prop-types";
// import { SECONDARY} from "../config/colors";
import CurrentBookingCard from "../components/CurrentBookingCard";
import { Content } from "native-base";
import { SECONDARY } from "../config/colors";
import { FONT_S, FONT_L } from "../config/fontSize";

const propTypes = {
  hospitalName: PropTypes.string.isRequired,
  hospitalTime: PropTypes.string.isRequired,
  visitorList: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

class CurrentBookingList extends Component {
  constructor(props) {
    super(props);
  }

  _renderBookingHeader(hospitalName, hospitalTime) {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.hospitalName}>{hospitalName}</Text>
        <Text style={styles.hospitalTime}>{hospitalTime}</Text>
      </View>
    );
  }

  _renderVisitorListItem(item) {
    return (
      <CurrentBookingCard
        name={item.name}
        number={item.number}
        tokenNumber={item.tokenNumber}
        onPress={this.props.onItemPress}
        bookingId={item.bookingId}
      />
    );
  }

  _renderVisitorList(visitorList) {
    return (
      <FlatList
        data={visitorList}
        renderItem={({ item }) => this._renderVisitorListItem(item)}
        scrollEnabled
        style={{ flexGrow: 1 }}
      />
    );
  }

  render() {
    const { hospitalName, hospitalTime, visitorList } = this.props;

    return (
      <Content>
        {this._renderBookingHeader(hospitalName, hospitalTime)}
        {this._renderVisitorList(visitorList)}
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12
  },
  hospitalName: {
    fontSize: FONT_L,
    color: SECONDARY
  },
  hospitalTime: {
    fontSize: FONT_S,
    color: "grey",
    paddingTop: 5
  }
});

export default CurrentBookingList;
