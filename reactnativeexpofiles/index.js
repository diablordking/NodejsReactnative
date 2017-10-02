import { DrawerNavigator } from 'react-navigation';
import RegisterForm from './src/Register';
import HomeScreen from './src/HomeScreen/index.js';
import LoginScreen from './src/LoginScreen';

const Navigator1 = DrawerNavigator({
  Onescreen: { screen: LoginScreen },
  SecondScreen: { screen: HomeScreen },
  Register: { screen: RegisterForm },
});
export default Navigator1;
