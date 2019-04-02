import React from "react";
import {
  View,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Fab,
  Icon,
  Label,
  Input,
  Button
} from "native-base";
import ModalDialog from "react-native-modalbox";
import DoctorCard from "../components/DoctorCard";
import {
  SECONDARY_DARK,
  BACKGROUND_2,
  SECONDARY,
  SECONDARY_LIGHT,
  WHITE,
  HELPER_TEXT_COLOR,
  DISABLED_GREY
} from "../config/colors";
import { VIEW_DOCTOR_PROFILE } from "../constants/viewNames";
import { icons } from "../constants/icons";
import { FONT_XL, FONT_XXXL } from "../config/fontSize";
import { FONT_WEIGHT_BOLD } from "../config/fontWeight";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import * as Actions from "../actions";
import APIService from "../services/APIService";
import { isNullOrEmpty } from "../commons/utils";

const SCREEN_W = Dimensions.get("window").width;

export class SearchDoctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchModalOpen: false,
      spinner: false,
      doctorsList: []
    };
  }

  componentDidMount() {
    //fetch doctors list based on the search criteria updated to the redux store in Search.js
    this.setState({ spinner: true }, () => {
      const { token, searchCriteria } = this.props;
      APIService.getDoctorsList(
        token,
        searchCriteria.location,
        searchCriteria.specialization,
        doctorsList => {
          this.setState({ doctorsList, spinner: false });
        }
      );
    });
  }

  _renderFloatingActionBtn() {
    const fabSearchStyle =
      Platform.OS === "ios"
        ? styles.fabSearch
        : [styles.fabSearch, { flex: 1 }];
    return (
      <Fab
        style={styles.fab}
        position="bottomRight"
        onPress={() => this.setState({ isSearchModalOpen: true })}
      >
        <Icon name="search" style={fabSearchStyle} />
      </Fab>
    );
  }

  _renderSearchModalDialog() {
    return (
      <ModalDialog
        style={[styles.modal, styles.searchDialogModal]}
        position={"center"}
        isDisabled={false}
        isOpen={this.state.isSearchModalOpen}
        onClosed={() => this.setState({ isSearchModalOpen: false })}
        backButtonClose={true}
        coverScreen={true}
      >
        <Text style={styles.searchModalDialogText}>Search Doctor</Text>
        <Item style={styles.searchItem}>
          <Input
            placeholder="Doctor name"
            onChangeText={searchDoctor => this.setState({ searchDoctor })}
            autoCapitalize="words"
            value={this.state.searchDoctor}
            style={styles.searchInput}
            autoFocus
          />
          <TouchableOpacity>
            <Icon
              name={icons.send}
              type="MaterialIcons"
              style={styles.goIcon}
            />
          </TouchableOpacity>
        </Item>
      </ModalDialog>
    );
  }

  _renderSearchListItem(item) {
    const { doctorDetails, _id } = item;
    const isFavorite = this.props.favorites.includes(_id);
    return (
      <DoctorCard
        imageURL={doctorDetails.profileImage}
        isFavorite={isFavorite}
        doctorName={doctorDetails.fullName}
        specialization={this.props.searchCriteria.specialization}
        // hospitalName={item.hospitalName}
        // isAvailable={item.isAvailable}
        onPress={() =>
          this.props.navigation.navigate(VIEW_DOCTOR_PROFILE, {
            title: "Dr. " + doctorDetails.fullName,
            userId: _id,
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

  _renderNoDoctorsFoundView() {
    return (
      <View
        style={{
          alignSelf: "center",
          marginTop: Dimensions.get("window").height / 3
        }}
      >
        <Text style={{ color: HELPER_TEXT_COLOR }}>
          No doctors found for your search criteria.
        </Text>
        <Icon
          name="emoji-sad"
          type="Entypo"
          style={{
            color: DISABLED_GREY,
            fontSize: 50,
            alignSelf: "center",
            marginTop: 10
          }}
        />
      </View>
    );
  }

  render() {
    console.log(this.state.doctorsList);
    return (
      <Container>
        <Content style={styles.contentBackground} padder>
          <View>{this._renderSearchList()}</View>
          {isNullOrEmpty(this.state.doctorsList) &&
            this._renderNoDoctorsFoundView()}
        </Content>
        {this._renderSearchModalDialog()}
        {this._renderSpinner()}
        {/* {this._renderFloatingActionBtn()} */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
  searchCriteria: state.searchCriteria,
  favorites: state.favorites
});

export default connect(
  mapStateToProps,
  Actions
)(SearchDoctor);

const styles = {
  modal: {
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15
  },
  searchDialogModal: {
    height: 150,
    width: SCREEN_W * 0.9
  },
  searchModalDialogText: {
    textAlign: "left",
    padding: 10,
    fontSize: FONT_XL,
    fontWeight: FONT_WEIGHT_BOLD,
    color: SECONDARY
  },
  fabSearch: {
    fontSize: 35,
    paddingTop: 10
  },
  fab: {
    backgroundColor: SECONDARY
  },
  contentBackground: {
    backgroundColor: BACKGROUND_2
  },
  goIcon: {
    color: SECONDARY
  },
  searchItem: {
    width: "75%",
    borderBottomColor: SECONDARY,
    marginBottom: 25
  },
  searchInput: {
    fontSize: FONT_XL,
    fontFamily: "Courier"
  }
};
