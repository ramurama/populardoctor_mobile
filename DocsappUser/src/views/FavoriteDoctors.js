import React from "react";
import { View, TextInput, FlatList, Dimensions, Platform } from "react-native";
import { Container, Content, Text, Item, Fab, Icon } from "native-base";
import ModalDialog from "react-native-modalbox";
import DoctorCard from "../components/DoctorCard";
import {
  SECONDARY_DARK,
  BACKGROUND_2,
  SECONDARY,
  WHITE,
  SHADOW_COLOR
} from "../config/colors";
import { VIEW_DOCTOR_PROFILE } from "../constants/viewNames";
import { FONT_XXL, FONT_L } from "../config/fontSize";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import * as Actions from "../actions";
import APIService from "../services/APIService";
import { isNullOrEmpty } from "../commons/utils";
import { FONT_WEIGHT_MEDIUM } from "../config/fontWeight";

const SCREEN_H = Dimensions.get("window").height;

export class FavoriteDoctors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      doctorsList: []
    };
  }

  componentDidMount() {
    const { token, favorites } = this.props;
    this.setState({ spinner: false }, () => {
      APIService.getFavorites(token, favorites, doctorsList => {
        this.setState({ doctorsList, spinner: false });
      });
    });
  }

  _renderSearchListItem(item) {
    const { doctorDetails, specialization, userId } = item;
    const isFavorite = this.props.favorites.includes(userId);
    return (
      <DoctorCard
        imageURL={doctorDetails.profileImage}
        isFavorite={isFavorite}
        doctorName={doctorDetails.fullName}
        specialization={specialization}
        // hospitalName={item.hospitalName}
        // isAvailable={item.isAvailable}
        onPress={() =>
          this.props.navigation.navigate(VIEW_DOCTOR_PROFILE, {
            title: "Dr. " + doctorDetails.fullName,
            userId,
            doctorName: doctorDetails.fullName,
            profileImage: doctorDetails.profileImage,
            isFavorite
          })
        }
      />
    );
  }

  _renderSearchList() {
    return (
      <FlatList
        data={this.state.doctorsList}
        renderItem={({ item }) => this._renderSearchListItem(item)}
        keyExtractor={(item, index) => item._id}
        extraData={this.props}
      />
    );
  }

  _renderSpinner() {
    return (
      <Spinner visible={this.state.spinner} textStyle={{ color: WHITE }} />
    );
  }

  _renderNoDataView() {
    return (
      <View style={styles.noDataView}>
        <Text style={styles.noDataText}>No favorites added.</Text>
      </View>
    );
  }

  render() {
    return (
      <Container>
        <Content style={styles.contentBackground} padder>
          <View>{this._renderSearchList()}</View>
          {isNullOrEmpty(this.state.doctorsList) && this._renderNoDataView()}
        </Content>
        {this._renderSpinner()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  favorites: state.favorites
});

export default connect(
  mapStateToProps,
  Actions
)(FavoriteDoctors);

const styles = {
  contentBackground: {
    backgroundColor: BACKGROUND_2
  },
  noDataView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    height: SCREEN_H * 0.6
  },
  noDataText: {
    alignSelf: "center",
    fontSize: FONT_L,
    fontWeight: FONT_WEIGHT_MEDIUM,
    color: SHADOW_COLOR
  }
};