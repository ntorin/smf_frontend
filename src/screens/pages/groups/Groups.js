import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import { BaseStyles, PrimaryColor } from 'helpers/constants.js';
import { GROUPS_POST_FETCH } from 'helpers/apicalls.js';
import Modal from 'components/Modal';

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            userid: '',
            sort_by: 'recent',
            query: '',

            newGroupLoading: false,
            newGroupDisabled: false
        }

        this.createGroup = this.createGroup.bind(this);
        this.viewGroup = this.viewGroup.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

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

    getGroups(page, callback, options) {
        console.log("getting groups; query: " + this.state.query);
        GROUPS_POST_FETCH(this.state.sort_by, this.state.query, page)
            .then((responseJSON) => {
                callback(responseJSON)
            });
    }

    createGroup() {
        this.setState({ newGroupLoading: true, newGroupDisabled: true })

        this.props.navigator.push({
            screen: 'smf_frontend.CreateGroup',
            title: 'Create Group',
            passProps: {
                user: this.props.user
            }
        });

        var t = this;
        setTimeout(function () {
            t.setState({ newGroupLoading: false, newGroupDisabled: false })
        }, 500)
    }

    viewGroup(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.ViewGroup',
            title: rowData.name,
            passProps: {
                group: rowData,
                user: this.props.user
            }
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <View style={layout.searchPanel}>
                    <TextInput style={layout.searchBar}
                        placeholder={'🔎 Search...'}
                        placeholderTextColor={PrimaryColor}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        onChangeText={(text) => this.setState({ query: text })}
                        onSubmitEditing={() => this.getGroups()}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                    <Button
                        title={"New Group"}
                        style={styles.newTopicButton}
                        onPress={this.createGroup}
                        loading={this.state.newGroupLoading}
                        disabled={this.state.newGroupDisabled}>
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
    newTopicButton: {
        flex: 3
    }
});

const layout = StyleSheet.create({
    searchPanel: {
        flexDirection: 'row'
    },
    searchBar: {
        flex: 7
    },

    groupList: {

    }
});

export default Groups;
