import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import Profile from './Profile.js';
import EditScreenOne from './EditScreenOne.js';

export default (DrawNav = StackNavigator({
  Profile: { screen: Profile },
  EditScreenOne: { screen: EditScreenOne },
}));
