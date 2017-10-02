import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import SecondScreen from './SecondScreen';

export default class Main extends Component {
  render() {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene
  key="loginScreen"
            component={LoginScreen}
            animation='fade'
            hideNavBar
            initial
	        />
	        <Scene
  key="secondScreen"
            component={SecondScreen}
            animation='fade'
            hideNavBar
	        />
	      </Scene>
	    </Router>
	  );
  }
}
