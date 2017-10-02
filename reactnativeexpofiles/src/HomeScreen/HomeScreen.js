import React from 'react';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
} from 'native-base';
import { AsyncStorage } from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      session: undefined,
      loading: true,
    };
  }
  componentDidMount() {
    this.loadSession().done(() => this.setState({ loading: false }));
  }

  async loadSession() {
    try {
      await AsyncStorage.getItem('info')
        .then((value) => JSON.parse(value))
        .then((value) => {
          this.setState({ session: value.username });
        }).done();
    } catch (error) {
      console.log(`There has been a problem with your fetch operation: ${error.message}`);
      // ADD THIS THROW error
      throw error;  
    }
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>{this.state.session} </Text>
              </Body>
            </CardItem>
          </Card>
          <Button
            full
            rounded
            dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('Chat')}
          >
            <Text>Chat With People</Text>
          </Button>
          <Button
            full
            rounded
            primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Text>Goto Profiles</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
