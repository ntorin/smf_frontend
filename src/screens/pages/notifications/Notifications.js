import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import { BaseStyles } from 'helpers/constants.js';
import { NOTIFICATIONS_POST_FETCH } from 'helpers/apicalls';

class Notifications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forceUpdate: false
        }

        this.getNotifications = this.getNotifications.bind(this);
    }

    viewNotification() {

    }

    getNotifications(page, callback, options) {
        NOTIFICATIONS_POST_FETCH(page)
            .then((responseJSON) => {
                console.log(responseJSON);
                if (responseJSON.length < 1) {
                    callback(responseJSON, {
                        allLoaded: true
                    })
                } else {
                    callback(responseJSON)
                }
                this.setState({ forceUpdate: false })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <PopulatableListView
                    type={'notification'}
                    onFetch={this.getNotifications}
                    onPress={this.viewNotification}
                    onLongPress={this.viewNotification}
                    pagination={true}
                    forceUpdate={this.state.forceUpdate}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
});

const layout = StyleSheet.create({

});

export default Notifications;