import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import PopulatableListView from 'components/PopulatableListView';
import { FOLLOWS_POST_MY_FOLLOWS } from 'helpers/apicalls';

class UserFollows extends React.Component {

    constructor(props) {
        super(props);
        
        this.getFollows = this.getFollows.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        
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

    getFollows(page, callback, options) {
        FOLLOWS_POST_MY_FOLLOWS(this.props.user.id, page)
            .then((responseJSON) => {
                if (responseJSON.length < 1) {
                    callback(responseJSON, {
                        allLoaded: true
                    })
                } else {
                    callback(responseJSON)
                }
            });
    }

    viewProfile(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.Profile',
            title: rowData.following.name + "\'s Profile",
            passProps: {
                user: rowData
            }
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <PopulatableListView
                    type={'user'}
                    onFetch={this.getFollows}
                    onPress={this.viewProfile}
                    pagination={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default UserFollows;