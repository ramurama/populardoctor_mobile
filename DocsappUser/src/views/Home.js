import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import commonStyles from '../commons/styles';
import FooterUser from '../components/FooterUser';
import { VIEW_HOME } from '../constants/viewNames';
import Spinner from 'react-native-loading-spinner-overlay';
import APIService from '../services/APIService';
import * as Actions from '../actions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // this._getGeoLocation(locationCoords => this.setState({ locationCoords }));
    this.setState({ spinner: true }, () => {
      APIService.getInitialData(this.props.token, data => {
        const { locations, specializations, favorites, support } = data;
        this.setState(
          {
            locations,
            specializations,
            spinner: false
          },
          () => {
            this.props.setFavorites(favorites);
            this.props.setUserSupport(support);
            this.props.setLocation(this.state.locations[0].name);
          }
        );
      });
    });
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <View />
        </Content>
        <FooterUser activeButton={VIEW_HOME} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
});

export default connect(
  mapStateToProps,
  Actions
)(Home);

const styles = StyleSheet.create({});
