import { Platform } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'helpers/icons-loader';
import { Navigation } from 'react-native-navigation';
import BaseStyles, { PrimaryColor, PrimaryDimmed, NavMenu, ScreenBackgroundColor } from 'helpers/styles';

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



let goToHome = (uid, client, access_token, user) => {
        var auth = {
            uid: uid,
            client: client,
            access_token: access_token
        }

        var props = {
            auth: auth,
            user: user,
            myUser: user,
            group: {
              id: 1
            }
        }
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
                    screen: 'smf_frontend.Nav',
                    passProps: props
                }
            },
            passProps: props
        });
    }

export {
  goToHome,
};
