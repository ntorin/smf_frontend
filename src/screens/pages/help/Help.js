import React from 'react';
import { StyleSheet, View, Text, ScrollView, Linking } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import Button from 'react-native-button';

class Help extends React.Component {

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
                <Text>Welcome to Citru.me!</Text>
                <Text style={styles.question}>
                    {"What is Citru.me?"}
                </Text>
                <Text>On Citru.me, you are able to talk about anything you like with anyone else, with a focus on freedom of what you would like to say, and freedom of what you would like to see.</Text>
                <Text style={styles.question}>
                    {"How does Citru.me work?"}
                </Text>
                <Text>Users can create groups, topics, and posts to communicate with each other about various subjects and interests. Topics are organized by their tags, which allows users to search for content that they are interested in more easily. In the main group of Citru.me, the Global BBS, you are free to discuss anything without restriction, as long as Citru.me's rules are followed. While you post anywhere on Citru.me, you will gain credits for your account, which will show how much you contribute to the community, and will later be used to personalize your account.</Text>
                <Text style={styles.question}>
                    {"What are the rules of Citru.me?"}
                </Text>
                <Text>No spamming, and no illegal content. Disobeying either of these rules will result in your account being suspended.</Text>
                <Text style={styles.question}>
                    {"How do I add special formatting to my posts (bold, italic, underline, etc.)?"}
                </Text>
                <View>
                    <Text>Citru.me uses Markdown for formatting posts. a full guide on Markdown can be found </Text>
                    <Button onPress={() => this.handleURL('https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet')} >
                        <Text style={styles.link}>here.</Text>
                    </Button>
                </View>
                <Text style={styles.question}>
                    {"I want to create my own group. How can I do that?"}
                </Text>
                <Text>Go to the "Groups" tab, and select "New Group" in the top right. Groups must have a unique identifier, a name, and at least one tag to help describe the group. (NOTE: none of this is currently editable, but this will change later on)</Text>
                <Text style={styles.question}>
                    {"Can other users help manage my group?"}
                </Text>
                <Text>Yes. Select your group in the groups tab, and press & hold any member in the "Members" tab. If your permissions are sufficient, you will be able to edit the role of that user. Moderators are able to pin, lock, and delete topics and posts, while Admins can do the same and promote or ban other users in the group.</Text>
                <Text style={styles.question}>
                    {"I want to gain more credits. Is there any alternative method to gain credits aside from posting?"}
                </Text>
                <Text>Currently, there are three methods of gaining credits; posting (10 credits per post), completing activities (daily/weekly/monthly activities; check the "Activities" tab in the navigation menu), and referring friends to Citru.me (10 credits per post the new user makes, up to 100).</Text>
                <Text style={styles.question}>
                    {"I want to connect to Citru.me on other devices. Where can I find the website to Citru.me?"}
                </Text>
                <Text>Unfortunately, Citru.me is currently only available on Android devices. iOS support will be coming in the near future, and a website/client after that.</Text>
                <Text style={styles.question}>
                    {"I want to help support the development of Citru.me. What should I do?"}
                </Text>
                <Text>The most helpful thing you can do is keep giving us feedback, and spread the word! The more users we gain, the better Citru.me will become. If you are able to refer even a single user to Citru.me, you are helping us out greatly.</Text>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    question: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginTop: 15
    },

    bold: {
        fontWeight: 'bold',
    },

    link: {
        color: '#0366de'
    }
});

const layout = StyleSheet.create({
    container: {
        padding: 15,
    },

    row: {
        flexDirection: 'row'
    }
});

export default Help;
