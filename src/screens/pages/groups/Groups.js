import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';
import { GROUPS_POST_FETCH } from 'helpers/apicalls.js';
import Modal from 'components/Modal';

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            username: '',
            userid: '',
        }

        this.createGroup = this.createGroup.bind(this);
        this.viewGroup = this.viewGroup.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses

            if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true
                })
            }
        }
    }

    getGroups(page = 1, callback, options) {
        groups =
            [{
                "id": 2,
                "creator_id": 0,
                "handle": "architecto",
                "name": "Holiday Java",
                "description": "Molestias ipsam occaecati doloremque accusamus officia.",
                "member_count": 0,
                "topic_count": 0,
                "post_count": 0,
                "lat": "0.0",
                "lng": "0.0",
                "created_at": "2017-12-05T03:16:40.341Z",
                "updated_at": "2017-12-05T03:16:40.341Z"
            },
            {
                "id": 3,
                "creator_id": 1,
                "handle": "reiciendis",
                "name": "Wake-up Treat",
                "description": "Minus qui ut tempore provident.",
                "member_count": 0,
                "topic_count": 0,
                "post_count": 0,
                "lat": "0.0",
                "lng": "0.0",
                "created_at": "2017-12-05T03:16:40.344Z",
                "updated_at": "2017-12-05T03:16:40.344Z"
            }]
        /*GROUPS_POST_FETCH('recent', '', 0, 25)
            .then((responseJSON) => {
                callback(responseJSON, {
                    allLoaded: true,
                })
            }); */
        callback(groups, {
            allLoaded: true,
        })
    }

    advancedSearch() {

    }

    createGroup() {
        this.props.navigator.push({
            screen: 'smf_frontend.CreateGroup',
            title: 'Create Group',
            passProps: {}
        });
    }

    viewGroup(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.BBS',
            title: 'rowData.name',
            passProps: {}
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <Modal
                    onRequestClose={this._hideModal}
                    visible={this.state.isModalVisible}>
                    
                    <View style={layout.searchPanel}>
                        <TextInput
                            style={{flex: 3}}
                            placeholder={'nickname'}
                            onChangeText={(text) => this.setState({ username: text })} />
                            <Button style={{flex: 1}}>
                                 Check
                            </Button>
                    </View>

                    <View style={layout.searchPanel}>
                        <TextInput
                            style={{flex: 3}}
                            placeholder={'user id'}
                            onChangeText={(text) => this.setState({ userid: text })} />
                            <Button style={{flex: 1}}>
                                 Check
                            </Button>
                    </View>

                    <Button onPress={this._hideModal}>
                        Confirm
                    </Button>
                    

                </Modal>

                <View style={layout.searchPanel}>
                    <TextInput style={layout.searchBar}
                        placeholder={'🔎 Search...'}
                        placeholderTextColor={PrimaryColor}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        onChangeText={(text) => this.setState({ searchQuery: text })}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                    <Button style={layout.advancedSearchButton} onPress={this._showModal}>
                        Advanced
                    </Button>
                </View>
                <View>
                    <Button style={layout.newTopicButton} onPress={this.createGroup}>
                        New Group
                    </Button>
                </View>
                <View style={layout.groupList}>
                    <PopulatableListView
                        type={'group'}
                        onFetch={this.getGroups}
                        onPress={this.viewGroup}
                    />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    searchPanel: {
        flexDirection: 'row'
    },
    searchBar: {
        flex: 5
    },

    advancedSearchButton: {
        flex: 5
    },

    groupList: {

    }
});

export default Groups;