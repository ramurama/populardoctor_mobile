import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Container, Content, Text, Icon } from "native-base";
import { connect } from "react-redux";
import commonStyles from "../commons/styles";
import LocationCard from "../components/LocationCard";
import LocationTextInput from "../components/LocationTextInput";
import * as Actions from "../actions";
import { toUpperCaseFirstOfEachWord } from "../commons/utils";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: []
    };
  }

  componentDidMount() {
    const locations = this.props.navigation.getParam("locations");
    this.setState({ locations });
  }

  _renderLocationCard(item) {
    return (
      <LocationCard
        text={item.name}
        onPress={() => {
          this.props.setLocation(item.name);
          this.props.navigation.goBack();
        }}
      />
    );
  }

  _renderLoationsList(locations) {
    return (
      <FlatList
        data={this.state.locations}
        renderItem={({ item }) => this._renderLocationCard(item)}
        keyExtractor={(item, index) => item}
        extraData={this.state}
      />
    );
  }

  _renderLocationSearchInput() {
    return (
      <View style={{ marginTop: 0, marginBottom: 20 }}>
        <LocationTextInput
          onChangeText={value => {
            this._filterLocations(value);
          }}
        />
      </View>
    );
  }

  _filterLocations(text) {
    const allLocations = this.props.navigation.getParam("locations");
    let filterText = toUpperCaseFirstOfEachWord(text);
    let locations = allLocations.filter(location => {
      if (location.name.includes(filterText)) {
        return location;
      }
    });
    this.setState({ locations });
  }

  render() {
    return (
      <Container>
        <Content style={commonStyles.containerBg}>
          {this._renderLocationSearchInput()}
          {this._renderLoationsList()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(
  mapStateToProps,
  Actions
)(Location);

const styles = StyleSheet.create({});
