import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Platform, ScrollView, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { iconsMap, iconsLoaded } from 'helpers/icons-loader';
import { Navigation } from 'react-native-navigation';
import Background from 'components/Background';
import { BaseStyles,  PrimaryColor, PrimaryDimmed, NavMenu, ScreenBackgroundColor } from 'helpers/constants';
import { AUTH_POST_SIGN_IN, AUTH_POST } from 'helpers/apicalls';
import Button from 'components/Button';
import { goToHome } from 'helpers/constants';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: {},
            responseHeaders: '',
            status: '',

            loginLoading: false,
            loginDisabled: false,
            registerLoading: false,
            registerDisabled: false,
        };

        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.validateAuthentication = this.validateAuthentication.bind(this);
    }

    setFirstResponse = (response) => {
      this.setState({ responseHeaders: response.headers.map, status: response.status })
        console.log(this.state)
    }

    loginUser() {
        var email = this.state.email;
        var password = this.state.password;

        this.setState({loginLoading: true, registerDisabled: true})

        AUTH_POST_SIGN_IN('user1@smf.com', '313Ghioio', this.setFirstResponse)
            .then((responseJSON) => {
              this.validateAuthentication(responseJSON);
            });
    }

    registerUser() {
        var email = this.state.email;
        var password = this.state.password;
        var password_confirmation = this.state.password;

        this.setState({registerLoading: true, loginDisabled: true})

        AUTH_POST(email, password, password_confirmation, this.setFirstResponse)
            .then((responseJSON) => {
              this.validateAuthentication(responseJSON);
            });
    }

    validateAuthentication(responseJSON){
      console.log(responseJSON);
      //errors = responseJSON.errors[0] ? responseJSON.errors : responseJSON.errors.full_messages
      if (this.state.status == 200) {
        this.setState({ user: responseJSON.data })
        goToHome(this.state.responseHeaders['uid'], this.state.responseHeaders['client'], this.state.responseHeaders['access-token'], this.state.user);
      } else {
        Alert.alert('Login Error', "Please make sure your email and password are correct, and try again.", [{ text: "OK", }])
        this.setState({loginLoading: false, loginDisabled: false, registerLoading: false, registerDisabled: false})
      }
    }

    render() {
        return (
            <ScrollView style={layout.container} contentContainerStyle={layout.contentContainer}>
                <Background img={require('assets/img/loginbg.jpg')} />
                <View style={layout.credentials}>
                    <Fumi
                        label={'Email'}
                        iconClass={Entypo}
                        iconName={'email'}
                        iconColor={PrimaryColor}
                        iconSize={20}
                        returnKeyType={'next'}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <Fumi
                        style={layout.password}
                        label={'Password'}
                        iconClass={Foundation}
                        iconName={'key'}
                        iconColor={PrimaryColor}
                        iconSize={20}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>
                <View style={layout.buttons}>
                    <Button onPress={this.loginUser} isLoading={this.state.loginLoading} isDisabled={this.state.loginDisabled}>
                        Login
                    </Button>
                    <Button onPress={this.registerUser} isLoading={this.state.registerLoading} isDisabled={this.state.registerDisabled}>
                        Register
                    </Button>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    input: {
    },
});

const layout = StyleSheet.create({
    container: {
        flex: 1
    },

    contentContainer: {
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#F9F9F9'
    },

    credentials: {
    },

    password: {
        marginTop: 4
    },

    buttons: {
        top: 25
    }
});

export default Login;
