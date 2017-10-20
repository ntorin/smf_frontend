import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Platform } from 'react-native';
import { iconsMap, iconsLoaded } from 'helpers/icons-loader';
import { Navigation } from 'react-native-navigation';
import Background from 'components/Background';
import { BaseStyles, PrimaryColor, PrimaryDimmed, NavMenu, ScreenBackgroundColor } from 'helpers/styles';
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
            }
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
            label: 'Discovery',
            screen: 'smf_frontend.Discovery',
            icon: iconsMap['compass'],
            title: 'Discover',
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
    }

    loginUser() {
        this.goToHome();
    }

    registerUser() {
        this.goToHome();
    }

    goToHome() {
        Navigation.startTabBasedApp({
            tabs,
            animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
            appStyle: {
                tabBarBackgroundColor: '#FFFFFF',
                navBarButtonColor: '#FFFFFF',
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
            <View style={layout.container}>
                <Background img={require('assets/img/loginbg.jpg')} />
                <TextInput
                    placeholder={'email'}
                    placeholderTextColor={PrimaryColor}
                    underlineColorAndroid={PrimaryColor}
                    selectionColor={PrimaryColor}
                    textAlign='center'
                    onChangeText={(text) => this.setState({ email: text })}
                    autoCorrect={false} autoCapitalize={'none'}
                    returnKeyType={'next'}
                    style={styles.credential} />
                <TextInput
                    placeholder={'password'}
                    placeholderTextColor={PrimaryColor}
                    underlineColorAndroid={PrimaryColor}
                    selectionColor={PrimaryColor}
                    textAlign='center'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text, })}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    style={styles.credential} />
                <Button onPress={this.goToHome}>
                    Login
                </Button>
                <Button onPress={this.registerUser}>
                    Register
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    credential: {

    },
});

const layout = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#EDEDED'
    },
});

export default Login;