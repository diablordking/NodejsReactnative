import Expo from 'expo';
import React from 'react';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { AsyncStorage, Animated, Dimensions, StyleSheet, View,	TouchableWithoutFeedback, Text, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import RegisterForm from './Register';
import App from './../App';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import UserInput from './UserInput';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';
import spinner from '../images/loading.gif';

const MARGIN = 40;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Username: '', Password: '', error: null, showPass: true, press: false,
    };
    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this.showPass = this.showPass.bind(this);
  }
  showPass() {
    this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false });
  }
registerscreen = () => {
  this.props.navigation.navigate('Register');
}
  login = () => {
    const details = {
      username: this.state.Username,
      password: this.state.Password,
    };
    console.log(`stateusername${this.state.Username}`);

    const formBody = Object.keys(details).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join('&');

    fetch('https://evening-dusk-97807.herokuapp.com/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success === true) {
          const info = response.message;

          AsyncStorage.setItem('info', JSON.stringify(info));
          this.props.navigation.navigate('SecondScreen');
        } else {
          alert(response.message);
        }
      })
      .done();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });
    const { navigate } = this.props.navigation;
    return (
      <Wallpaper>
        <Logo />

        <KeyboardAvoidingView
          behavior='padding'
          style={styles.container}
        >
          <UserInput
            source={usernameImg}
            placeholder='Username'
            autoCapitalize={'none'}
            returnKeyType={'done'}
            onChangeText={(Username) => this.setState({ Username })} 
            value={this.state.Username} 
            autoCorrect={false}
          />
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder='Password'
            returnKeyType={'done'}
            autoCapitalize={'none'}
            onChangeText={(Password) => this.setState({ Password })} 
            value={this.state.Password} 
            autoCorrect={false}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}
          >
            <Image source={eyeImg} style={styles.iconEye} />
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <SignupSection />

        <View style={styles.containerbutton}>
          <Animated.View style={{ width: changeWidth }}>

            <TouchableOpacity
              style={styles.button}
              onPress={this.login}
              activeOpacity={1}
            >
              {this.state.isLoading ?
                <Image source={spinner} style={styles.image} />
                :
                <Text style={styles.text}>LOGIN</Text>
              }
            </TouchableOpacity>
            <View style={[styles.circle]} />
          </Animated.View>
        </View>
      
      </Wallpaper>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },

  containerbutton: {
    flex: 1,
    top: -95,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});
const Navigator1 = DrawerNavigator({
  Onescreen: { screen: LoginScreen },
  SecondScreen: { screen: App },
  Register: { screen: RegisterForm },
});
Expo.registerRootComponent(Navigator1);
