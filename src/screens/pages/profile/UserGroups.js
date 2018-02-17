import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import { GROUPS_POST_MY_GROUPS } from 'helpers/apicalls.js';
import PopulatableListView from 'components/PopulatableListView';

class UserGroups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort_by: 'recent',
            query: ''
        }

        this.getGroups = this.getGroups.bind(this);
        this.viewGroup = this.viewGroup.bind(this);
    }

    getGroups(page, callback, options) {
        GROUPS_POST_MY_GROUPS(this.props.user.id, page)
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

    viewGroup(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.ViewGroup',
            title: rowData.name,
            passProps: {
                group: rowData
            }
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <PopulatableListView
                    type={'group'}
                    onFetch={this.getGroups}
                    onPress={this.viewGroup}
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

export default UserGroups;