import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Linking } from 'react-native';
import { BaseStyles, APPLICATION_VERSION } from 'helpers/constants.js';
import TermsOfService from 'components/TermsOfService';
import Button from 'react-native-button';

class About extends React.Component {

    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
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
                this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
                    isVisible = responseJSON
                    if (isVisible) {
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
                });
                break;
        }

        switch (event.id) {
            case 'bottomTabReselected':
                this.props.navigator.popToRoot({
                    animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                    animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                });
                break;
        }
    }

    handleURL(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
            } else {
                return Linking.openURL(url);
            }
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={layout.container}>
                <Image style={styles.appIcon} source={require('assets/img/loginicon.png')} />
                <Text>{APPLICATION_VERSION}</Text>
                <Text>Created by Iris Inami.</Text>
                <View style={[layout.row, layout.smIcons]}>
                    <Button onPress={() => this.handleURL('https://www.facebook.com/Citrume-128895584471385/')}>
                        <Image style={styles.smIcon} source={require('assets/img/fb.png')} />
                    </Button>
                    <Button onPress={() => this.handleURL('https://twitter.com/irisinami')}>
                        <Image style={styles.smIcon} source={require('assets/img/twitter.png')} />
                    </Button>
                    <Button onPress={() => this.handleURL('https://www.instagram.com/irisinami/')}>
                        <Image style={styles.smIcon} source={require('assets/img/ig.png')} />
                    </Button>
                </View>
                <Text>Option and navigation menu icons from Icons8.</Text>
                <TermsOfService />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    appIcon: {
        width: 128,
        height: 128
    },

    smIcon: {
        width: 48,
        height: 48,
        marginRight: 5,
        marginLeft: 5
    },

    bigFont: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    medFont: {
        fontSize: 16
    },
});

const layout = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row'
    },
    smIcons: {

    }
});

export default About;