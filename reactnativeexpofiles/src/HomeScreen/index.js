import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen.js';
import MainScreenNavigator from '../ChatScreen/index.js';
import Profile from '../ProfileScreen/index.js';
import SideBar from '../Sidebar/Sidebar';

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    Profile: { screen: Profile },
  },
  {
    contentComponent: props => <SideBar  {...props} />,
  }
);
export default HomeScreenRouter;
