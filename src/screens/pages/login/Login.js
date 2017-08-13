import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Platform } from 'react-native';
import { iconsMap, iconsLoaded } from '../../../helpers/icons-loader';
import { Navigation } from 'react-native-navigation';

import Button from 'apsl-react-native-button'

var tabs;

iconsLoaded.then(() => {
    tabs = [{
        label: 'Lobbies',
        screen: 'storytime_buddies_frontend.LobbyList',
        icon: iconsMap['pencil'],
        title: 'Available Lobbies',
    },
    {
        label: 'Library',
        screen: 'storytime_buddies_frontend.Library',
        icon: iconsMap['book-bookmark'],
        title: 'Story Library',
    },
    {
        label: 'Messages',
        screen: 'storytime_buddies_frontend.Messages',
        icon: iconsMap['chat'],
        title: 'Recent Messages',
    },
    {
        label: 'Profile',
        screen: 'storytime_buddies_frontend.MyProfile',
        icon: iconsMap['person'],
        title: 'Your Profile',
    }];


});


class Login extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../../../assets/img/loginbg.jpg')} style={styles.backgroundImage} >
                    <TextInput placeholder={'username'} autoCorrect={false} autoCapitalize={'none'} style={[styles.credential, { bottom: Dimensions.get('window').height * 0.5 }]} />
                    <TextInput placeholder={'password'} autoCorrect={false} autoCapitalize={'none'} style={[styles.credential, { bottom: Dimensions.get('window').height * 0.4 }]} />
                    <Button onPress={this.goToHome} textStyle={styles.buttonText} style={[styles.button, { bottom: Dimensions.get('window').height * 0.3 }]}>
                        Login
                    </Button>
                    <Button onPress={this.registerUser} textStyle={styles.buttonText} style={[styles.button, { bottom: Dimensions.get('window').height * 0.2 }]}>
                        Register
                    </Button>
                </Image>
            </View>
        )
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
            tabsStyle: {
                tabBarBackgroundColor: '#3bc9a7',
                navBarButtonColor: '#ffffff',
                tabBarButtonColor: '#ffffff',
                navBarTextColor: '#ffffff',
                tabBarSelectedButtonColor: '#ff505c',
                navigationBarColor: '#3bc9a7',
                navBarBackgroundColor: '#3bc9a7',
                statusBarColor: '#34b092',
                tabFontFamily: 'BioRhyme-Bold',
            },
            appStyle: {
                tabBarBackgroundColor: '#3bc9a7',
                navBarButtonColor: '#ffffff',
                tabBarButtonColor: '#ffffff',
                navBarTextColor: '#ffffff',
                tabBarSelectedButtonColor: '#fbf5a9',
                navigationBarColor: '#000000',
                navBarBackgroundColor: '#3bc9a7',
                statusBarColor: '#34b092',
                tabFontFamily: 'BioRhyme-Bold',
            },
            drawer: {
                left: {
                    screen: 'storytime_buddies_frontend.Nav'
                }
            }
        });
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    credential: {
        position: 'absolute',
        width: Dimensions.get('window').width * 0.7,
        left: Dimensions.get('window').width * 0.15,
        bottom: Dimensions.get('window').height * 0.5
    },

    button: {
        position: 'absolute',
        width: Dimensions.get('window').width * 0.7,
        left: Dimensions.get('window').width * 0.15,
        right: Dimensions.get('window').width * 0.15,
        backgroundColor: '#41ddb8',
        borderWidth: 0
    },

    buttonText: {
        color: '#ffffff'
    }
});

export default Login;