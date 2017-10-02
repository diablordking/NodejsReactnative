import Expo from 'expo';
import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '', email: '', mobile: '', first_name: '', last_name: '' };
  }

  register = () => {
    const details = {
      username: this.state.username,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
      mobile: this.state.mobile,
    };
    console.log(`stateusername${this.state.username}`);

    const formBody = Object.keys(details).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join('&');

    fetch('https://evening-dusk-97807.herokuapp.com/register', {
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
          const username = response.message;

          AsyncStorage.setItem('username', username);
          this.props.navigation.navigate('SimpleForm');
        } else {
          alert(response.message);
        }
      })
      .done();
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={require('../assets/img/sd.png')} style={styles.backgroundImage}>
          <View style={styles.content}>
            <Text style={styles.logo}>Toto Prediction </Text>
            <View style={styles.inputContainer}>

              <TextInput
                underlineColorAndroid='transparent' style={styles.input}
                onChangeText={(username) => this.setState({ username })} 
                value={this.state.username} placeholder='username'
              /> 

              <TextInput
                secureTextEntry underlineColorAndroid='transparent' style={styles.input}
                onChangeText={(password) => this.setState({ password })} 
                value={this.state.password} placeholder='password'
              /> 
              <TextInput
                underlineColorAndroid='transparent' style={styles.input}
                onChangeText={(first_name) => this.setState({ first_name })} 
                value={this.state.first_name} placeholder='first_name'
              />
              <TextInput
                underlineColorAndroid='transparent' style={styles.input}
                onChangeText={(last_name) => this.setState({ last_name })} 
                value={this.state.last_name} placeholder='last_name'
              />
              <TextInput
                underlineColorAndroid='transparent' style={styles.input}
                onChangeText={(email) => this.setState({ email })} 
                value={this.state.email} placeholder='email'
              />              
              <TextInput
                underlineColorAndroid='transparent' style={styles.input}
                onChangeText={(mobile) => this.setState({ mobile })} 
                value={this.state.mobile} placeholder='mobile'
              />              

            </View>
            <TouchableOpacity onPress={this.register} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </Image>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center', 
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textShadowColor: '#252525',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 15,
    marginBottom: 20,
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  buttonContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

