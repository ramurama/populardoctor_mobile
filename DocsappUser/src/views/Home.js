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
import Header from '../components/HeaderUser';
import { HOME } from '../constants/strings';
import { WHITE } from '../config/colors';
import RatingModal from '../components/RatingModal';
import { isNullOrEmpty, getDateStringIndian } from '../commons/utils';
import { KEY_LOCATION_INI } from '../constants/AsyncDataKeys';
import { AsyncDataService } from '../services/AsyncDataService';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      feedbackModalVisible: false,
      bookingsWithoutFeedback: {}
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // this._getGeoLocation(locationCoords => this.setState({ locationCoords }));
    if (!this.props.receivedInitialData) {
      this.setState({ spinner: true }, () => {
        APIService.getInitialData(this.props.token, data => {
          const {
            locations,
            specializations,
            favorites,
            support,
            bookingWithoutFeedback
          } = data;

          //set feedbackModalVisible to false initially
          let feedbackModalVisible = false;
          if (!isNullOrEmpty(bookingWithoutFeedback)) {
            //if bookings without feedback available, show feedback modal
            feedbackModalVisible = true;
          }
          this.setState(
            {
              spinner: false,
              feedbackModalVisible
            },
            async () => {
              this.props.setLocationsList(locations);
              this.props.setSpecializations(specializations);
              this.props.setFavorites(favorites);
              this.props.setUserSupport(support);
              this.props.setBookingWithoutFeedback(bookingWithoutFeedback);
              //set receivedInitialData true in redux state.
              //if set to true, next time the datashould not be fetched
              //if false, data should be fetched
              this.props.setReceivedInitialData(true);

              //get location INI and set to redux state
              try {
                let location = await AsyncDataService.getItem(
                  KEY_LOCATION_INI,
                  false
                );
                if (isNullOrEmpty(location)) {
                  this.props.setLocation(locations[0].name);
                } else {
                  this.props.setLocation(location);
                }
              } catch (err) {
                this.props.setLocation(locations[0].name);
                console.log(err);
              }
            }
          );
        });
      });
    } else {
      if (!isNullOrEmpty(this.props.bookingWithoutFeedback)) {
        //if bookings without feedback available, show feedback modal
        this.setState({ feedbackModalVisible: true });
      }
    }
  }

  handleBackButton = () => {
    return true;
  };

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  _computerAndRenderRatingModal() {
    const { feedbackModalVisible } = this.state;
    const { bookingWithoutFeedback, token } = this.props;
    let doctorName = '';
    let date = '';
    if (!isNullOrEmpty(bookingWithoutFeedback)) {
      doctorName = bookingWithoutFeedback.doctorName;
      date = getDateStringIndian(
        new Date(bookingWithoutFeedback.appointmentDate)
      );
    }
    return (
      <RatingModal
        doctorName={doctorName}
        date={date}
        visible={feedbackModalVisible}
        onSubmit={(rating, suggestions) => {
          this.setState({ feedbackModalVisible: false }, () => {
            const feedbackData = {
              bookingId: bookingWithoutFeedback.bookingId,
              rating,
              suggestions
            };
            APIService.submitFeedback(token, feedbackData, data => {
              const { status } = data;
              if (status) {
                this.props.setBookingWithoutFeedback({});
              }
            });
          });
        }}
      />
    );
  }

  render() {
    return (
      <Container>
        <Header title={HOME} />
        <Content>
          {this._computerAndRenderRatingModal()}
          {this._renderSpinner()}
        </Content>
        <FooterUser activeButton={VIEW_HOME} {...this.props} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  receivedInitialData: state.receivedInitialData,
  bookingWithoutFeedback: state.bookingWithoutFeedback
});

export default connect(mapStateToProps, Actions)(Home);

const styles = StyleSheet.create({});
