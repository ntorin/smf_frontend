import { Platform, StyleSheet, AsyncStorage } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'helpers/icons-loader';
import { Navigation } from 'react-native-navigation';
import { JSON_HEADERS, GROUP_USERS_POST_CHECK_REQUEST } from 'helpers/apicalls';

export const WEBSOCKET_URL = 'ws://18.218.93.101/cable';

export const ANDROID_ADMOB_AD_UNIT_ID = 'ca-app-pub-3289567150609681/5928312822';

export const IOS_ADMOB_AD_UNIT_ID = 'ca-app-pub-3289567150609681/2356914659';

export const APPLICATION_VERSION = 'Version 0.5.0 (Alpha)';

export var user = {
    id: 0
}

export const editUser = (usr) => {
    user = usr;
}

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

export const onNavEvent = (event) => { // this is the onPress handler for the two buttons together
    switch (event.type) {
        case 'NavBarButtonPress':
            if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true
                })
            }
            break;

        case 'DeepLink':
            if (this.isVisible) {
                const parts = event.link.split('/'); // Link parts
                const payload = event.payload; // (optional) The payload
                if (parts[0] == 'nav') {
                    this.props.navigator.push({
                        screen: parts[1],
                        title: payload
                    });
                    // handle the link somehow, usually run a this.props.navigator command
                }
            }
            break;
    }

    switch (event.id) {
        case 'didAppear':
            this.isVisible = this.props.navigator.screenIsCurrentlyVisible();
            break;
        case 'didDisappear':
            this.isVisible = this.props.navigator.screenIsCurrentlyVisible();
            break;
    }
}

export const PrimaryColor = '#219591';
export const PrimaryDimmed = 'rgba(33, 149, 145, 0.5)';
export const ScreenBackgroundColor = '#FFFFFF';
export const BaseStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ScreenBackgroundColor,
        padding: 15
    },

    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
});

export const NavMenu = {
    leftButtons: [{
        icon: iconsMap['menu'],
        id: 'menu',
    }]
};

export const NavStyle = {
    navBarBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    drawUnderNavBar: false,
    navBarTranslucent: true,
    tabBarBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    drawUnderTabBar: false,
    tabBarTranslucent: true,
};

export const NavNoElevation = {
    topBarElevationShadowEnabled: false
}



export const startApp = () => {
    // this will start our app
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'smf_frontend.Login',
            navigatorStyle: {
                navBarHidden: true,
                navBarTransparent: true,
                drawUnderNavBar: true,
            },
        },
        animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade'
    });
}

export const setAuthData = (uid, client, access_token, token_type, expiry, usr) => {
    JSON_HEADERS['access-token'] = access_token;
    JSON_HEADERS['token-type'] = token_type;
    JSON_HEADERS['client'] = client;
    JSON_HEADERS['expiry'] = expiry;
    JSON_HEADERS['uid'] = uid;
    user = usr;
}

export const goToHome = () => {

    GROUP_USERS_POST_CHECK_REQUEST(1)
        .then((responseJSON) => {
            var props = {
                user: user,
                group: {
                    id: 1,
                    name: 'Global BBS',
                    identifier: 'global',
                },
                joinStatus: responseJSON.status,
                group_user: responseJSON.group_user
            }
            Navigation.startTabBasedApp({
                tabs,
                animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
                tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
                    tabBarButtonColor: PrimaryDimmed,
                    tabBarSelectedButtonColor: PrimaryColor,
                    tabBarBackgroundColor: '#FFFFFF',
                    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
                },
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
                        screen: 'smf_frontend.Nav',
                        passProps: props
                    }
                },
                passProps: props
            });
        })
}

export const logoutUser = () => {
    user = {};
    JSON_HEADERS['access-token'] = '';
    JSON_HEADERS['token-type'] = '';
    JSON_HEADERS['client'] = '';
    JSON_HEADERS['expiry'] = '';
    JSON_HEADERS['uid'] = '';
    AsyncStorage.removeItem('smf_frontend.email');
    AsyncStorage.removeItem('smf_frontend.password');
    startApp();
}