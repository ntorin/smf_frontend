import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Platform, ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { iconsMap, iconsLoaded } from 'helpers/icons-loader';
import { Navigation } from 'react-native-navigation';
import Background from 'components/Background';
import BaseStyles, { PrimaryColor, PrimaryDimmed, NavMenu, ScreenBackgroundColor } from 'helpers/styles';
import { AUTH_POST_SIGN_IN, AUTH_POST } from 'helpers/apicalls';
import Button from 'components/Button';

var tabs;

iconsLoaded.then(() => {
    tabs = [
        {
            label: 'Feed',
            screen: 'smf_frontend.Feed',
            icon: iconsMap['news'],
            title: 'Feed',
            navigatorButtons: {
                leftButtons: [{
                    icon: iconsMap['menu'],
                    id: 'menu',
                }]
            },
        },
        {
            label: 'BBS',
            screen: 'smf_frontend.BBS',
            icon: iconsMap['chat'],
            title: 'BBS',
            navigatorButtons: {
                leftButtons: [{
                    icon: iconsMap['menu'],
                    id: 'menu',
                }]
            }
        },
        {
            label: 'Groups',
            screen: 'smf_frontend.Groups',
            icon: iconsMap['group'],
            title: 'BBS Groups',
            navigatorButtons: {
                leftButtons: [{
                    icon: iconsMap['menu'],
                    id: 'menu',
                }]
            }
        },
        {
            label: 'Messages',
            screen: 'smf_frontend.Messages',
            icon: iconsMap['mail'],
            title: 'Messages',
            navigatorButtons: {
                leftButtons: [{
                    icon: iconsMap['menu'],
                    id: 'menu',
                }]
            }
        },
        {
            label: 'Profile',
            screen: 'smf_frontend.Profile',
            icon: iconsMap['person'],
            title: 'Profile',
            navigatorButtons: {
                leftButtons: [{
                    icon: iconsMap['menu'],
                    id: 'menu',
                }],
                rightButtons: [{
                    icon: iconsMap['pencil'],
                    id: 'edit',
                }]
            }
        }
    ];
});


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            responseHeaders: '',
            user: {},
        };

        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    loginUser() {
        var email = this.state.email;
        var password = this.state.password;

        AUTH_POST_SIGN_IN(email, password, null)
            .then((responseJSON) => {
                this.goToHome();
            });
    }

    registerUser() {
        var email = this.state.email;
        var password = this.state.password;
        var password_confirmation = this.state.password;

        AUTH_POST(email, password, password_confirmation, null)
            .then((responseJSON) => {
                this.goToHome();
            });
    }

    goToHome() {
        Navigation.startTabBasedApp({
            tabs,
            animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
            appStyle: {
                tabBarBackgroundColor: '#FFFFFF',
                navBarButtonColor: PrimaryColor,
                tabBarButtonColor: PrimaryDimmed,
                navBarTextColor: PrimaryColor,
                tabBarSelectedButtonColor: PrimaryColor,
                navigationBarColor: '#000000',
                navBarBackgroundColor: '#FFFFFF',
                statusBarColor: '#000000',
                tabFontFamily: 'BioRhyme-Bold',
                screenBackgroundColor: ScreenBackgroundColor,
            },
            drawer: {
                left: {
                    screen: 'smf_frontend.Nav'
                }
            }
        });
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
                    <Button onPress={this.loginUser}>
                        Login
                    </Button>
                    <Button onPress={this.registerUser}>
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
        backgroundColor: '#EDEDED'
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