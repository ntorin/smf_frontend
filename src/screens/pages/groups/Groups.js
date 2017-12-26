import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import { BaseStyles,  PrimaryColor } from 'helpers/constants.js';
import { GROUPS_POST_FETCH } from 'helpers/apicalls.js';
import Modal from 'components/Modal';

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            username: '',
            userid: '',
            sort_by: 'recent',
            query: '',

            advancedSearchLoading: false,
            advancedSearchDisabled: false,
            newGroupLoading: false,
            newGroupDisabled: false
        }

        this.createGroup = this.createGroup.bind(this);
        this.viewGroup = this.viewGroup.bind(this);
        this.getGroups = this.getGroups.bind(this);
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

    getGroups(page, callback, options) {
        GROUPS_POST_FETCH(this.state.sort_by, this.state.query, page)
            .then((responseJSON) => {
                console.log("THE GROUPS: " + responseJSON[0])
                callback(responseJSON, {
                    allLoaded: true,
                })
            });
    }

    advancedSearch() {

    }

    createGroup() {
      this.setState({newGroupLoading: true, advancedSearchDisabled: true})

        this.props.navigator.push({
            screen: 'smf_frontend.CreateGroup',
            title: 'Create Group',
            passProps: {
              user: this.props.user
            }
        });

        var t = this;
        setTimeout(function(){
          t.setState({newGroupLoading: false, advancedSearchDisabled: false})
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
                        onChangeText={(text) => this.setState({ query: text })}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                    <Button
                    style={layout.advancedSearchButton}
                    onPress={this._showModal}
                    isLoading={this.state.advancedSearchLoading}
                    isDisabled={this.state.advancedSearchDisabled}>
                        Advanced
                    </Button>
                </View>
                <View>
                    <Button
                    style={layout.newTopicButton}
                    onPress={this.createGroup}
                    isLoading={this.state.newGroupLoading}
                    isDisabled={this.state.newGroupDisabled}>
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
