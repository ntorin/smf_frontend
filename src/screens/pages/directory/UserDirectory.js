import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import { USERS_POST_FETCH } from 'helpers/apicalls';
import { BaseStyles, PrimaryColor } from 'helpers/constants.js';

class UserDirectory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            name: '',
            sort_by: 'popular',
            query: '',
            forceUpdate: false,
        }

        this.getUsers = this.getUsers.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
    }

    getUsers(page = 1, callback, options) {
        USERS_POST_FETCH(this.state.identifier, this.state.name, this.state.sort_by, page)
            .then((responseJSON) => {
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
                <View>
                    <TextInput
                        placeholder={'🔎 Search...'}
                        placeholderTextColor={PrimaryColor}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        onChangeText={(text) => this.setState({ name: text, identifier: text })}
                        onSubmitEditing={() => this.setState({ forceUpdate: true })}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                </View>
                <View style={{ flex: 1 }}>
                    <PopulatableListView
                        type={'user'}
                        onFetch={this.getUsers}
                        onPress={this.viewProfile}
                        pagination={false}
                        forceUpdate={this.state.forceUpdate}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
});

export default UserDirectory;
