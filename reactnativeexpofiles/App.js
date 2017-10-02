import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { StyleSheet, Text, View } from 'react-native';
import Expo from 'expo';
import HomeScreen from './src/HomeScreen/index';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ isReady: true });
  }
  buttonPressed() {
    
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return <HomeScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
