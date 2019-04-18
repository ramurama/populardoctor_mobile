import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Text } from 'native-base';
import commonStyles from '../commons/styles';
import FooterUser from '../components/FooterUser';
import { VIEW_HOME } from '../constants/viewNames';

class Home extends React.Component {
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

export default Home;

const styles = StyleSheet.create({});
