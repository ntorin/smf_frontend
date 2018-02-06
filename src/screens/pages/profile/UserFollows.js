import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import PopulatableListView from 'components/PopulatableListView';
import { FOLLOWS_POST_MY_FOLLOWS } from 'helpers/apicalls';

class UserFollows extends React.Component {

    constructor(props) {
        super(props);
        
        this.getFollows = this.getFollows.bind(this);
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
            title: rowData.name + "\'s Profile",
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
                    pagination={false}
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