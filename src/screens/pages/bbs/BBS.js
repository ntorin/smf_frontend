import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import { BaseStyles, PrimaryColor, user } from 'helpers/constants.js';
import { TOPICS_POST_FETCH, TOPICS_DELETE, TOPICS_PUT_UPDATE } from 'helpers/apicalls.js';
import { iconsMap } from 'helpers/icons-loader';
import Modal from 'components/Modal';
import ModalOptions from 'components/ModalOptions';

class BBS extends React.Component {
    static navigatorButtons = {
        rightButtons: [{
            icon: iconsMap['pin'],
            id: 'pins',
        }]
    };

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,

            query: '',
            sort_by: 'recent',
            forceUpdate: false,

            searchLoading: false,
            searchDisabled: false,
            newTopicLoading: false,
            newTopicDisabled: false,

            selectedTopic: {}
        };

        if (this.props.joinStatus === 'none' || this.props.group_user.is_banned) {
            this.state.newTopicDisabled = true;
        }

        this.createTopic = this.createTopic.bind(this);
        this.viewTopic = this.viewTopic.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.getTopics = this.getTopics.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.onModalAction = this.onModalAction.bind(this);
        this.selectTopic = this.selectTopic.bind(this);
    }

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        switch (event.type) {
            case 'NavBarButtonPress':
                if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                    this.props.navigator.toggleDrawer({
                        side: 'left',
                        animated: true
                    })
                }

                if (event.id == 'pins') {
                    this.props.navigator.push({
                        screen: 'smf_frontend.ViewPins',
                        title: 'Pinned Topics for ' + this.props.group.name,
                        passProps: {
                            group: this.props.group,
                            joinStatus: this.state.joinStatus
                        }
                    });
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
            case 'didAppear':
                this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
                    isVisible = responseJSON;
                });
                break;
            case 'didDisappear':
                this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
                    isVisible = responseJSON;
                });
                break;
        }
    }

    onModalAction(action, selected) {
        const parts = action.link.split('/');
        switch (parts[0]) {
            case 'screen':
                this.props.navigator.push({
                    screen: parts[1],
                    title: action.name,
                    passProps: {
                        selected: selected.user,
                        group_id: this.props.group.id
                    }
                });
                break;
            case 'function':
                switch (parts[1]) {
                    case 'pin':
                        this.pinTopic(selected);
                        break;
                    case 'unpin':
                        this.unpinTopic(selected);
                        break;
                    case 'lock':
                        this.lockTopic(selected);
                        break;
                    case 'unlock':
                        this.unlockTopic(selected);
                    case 'delete':
                        this.deleteTopic(selected);
                        break;
                }
        }
        this._hideModal();
    }

    pinTopic(selected) {
        Alert.alert('Pin Topic',
            'Are you sure you want to pin the topic \"' + selected.title + '\"?',
            [{
                text: 'YES', onPress: () => {
                    TOPICS_PUT_UPDATE(selected.id, true, selected.is_locked)
                        .then((responseJSON) => {
                            console.log(responseJSON);
                            this.setState({ forceUpdate: false })
                        })
                }
            },
            { text: 'NO' }])
    }

    unpinTopic(selected) {
        Alert.alert('Unpin Topic',
            'Are you sure you want to unpin the topic \"' + selected.title + '\"?',
            [{
                text: 'YES', onPress: () => {
                    TOPICS_PUT_UPDATE(selected.id, false, selected.is_locked)
                        .then((responseJSON) => {
                            console.log(responseJSON);
                            this.setState({ forceUpdate: false })
                        })
                }
            },
            { text: 'NO' }])
    }

    deleteTopic(selected) {
        Alert.alert('Delete Topic',
            'Are you sure you want to delete the topic \"' + selected.title + '\"?',
            [{
                text: 'YES', onPress: () => {
                    TOPICS_DELETE(selected.id)
                        .then((responseJSON) => {
                            console.log(responseJSON);
                            this.setState({ forceUpdate: false })
                        });
                }
            },
            { text: 'NO' }])
    }

    lockTopic(selected) {
        Alert.alert('Lock Topic',
            'Are you sure you want to lock the topic \"' + selected.title + '\"?',
            [{
                text: 'YES', onPress: () => {
                    TOPICS_PUT_UPDATE(selected.id, selected.is_pinned, true)
                        .then((responseJSON) => {
                            console.log(responseJSON);
                            this.setState({ forceUpdate: false })
                        })
                }
            },
            { text: 'NO' }])
    }

    unlockTopic(selected) {
        Alert.alert('Unlock Topic',
            'Are you sure you want to unlock the topic \"' + selected.title + '\"?',
            [{
                text: 'YES', onPress: () => {
                    TOPICS_PUT_UPDATE(selected.id, selected.is_pinned, false)
                        .then((responseJSON) => {
                            console.log(responseJSON);
                            this.setState({ forceUpdate: false })
                        })
                }
            },
            { text: 'NO' }])
    }

    selectTopic(rowData) {
        this.setState({ selectedTopic: rowData });
        this._showModal();
    }

    getTopics(page, callback, options) {
        TOPICS_POST_FETCH(this.props.group.id, this.state.sort_by, false, this.state.query, page)
            .then((responseJSON) => {
                if (responseJSON.length < 1) {
                    callback(responseJSON, {
                        allLoaded: true
                    })
                } else {
                    callback(responseJSON)
                }
                this.setState({ forceUpdate: false })
            });
    }

    createTopic() {
        this.setState({ newTopicLoading: true, newTopicDisabled: true })

        this.props.navigator.push({
            screen: 'smf_frontend.CreateTopic',
            title: 'Create Topic',
            passProps: {
                group_id: this.props.group.id
            }
        });

        var t = this;
        setTimeout(function () {
            t.setState({ newTopicLoading: false, newTopicDisabled: false })
        }, 500)
    }

    viewTopic(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.ViewTopic',
            title: rowData.title,
            passProps: {
                topic: rowData,
                joinStatus: this.props.joinStatus,
                group_user: this.props.group_user
            }
        });
    }

    renderModal() {
        return (
            <Modal
                onRequestClose={this._hideModal}
                visible={this.state.isModalVisible}>
                <View style={BaseStyles.container}>
                    <Text style={styles.bigFont}>Topic Options</Text>
                    <ModalOptions
                        type={'topic'}
                        callback={this.onModalAction}
                        group_user={this.props.group_user}
                        selected={this.state.selectedTopic}
                    />
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <View style={layout.container}>
                {this.renderModal()}
                <View style={layout.searchPanel}>
                    <TextInput style={layout.searchBar}
                        placeholder={'🔎 Search...'}
                        placeholderTextColor={PrimaryColor}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        onChangeText={(text) => this.setState({ query: text })}
                        onSubmitEditing={() => this.setState({ forceUpdate: true })}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                    <Button
                        title={"New Topic"}
                        style={styles.newTopicButton}
                        onPress={this.createTopic}
                        loading={this.state.newTopicLoading}
                        disabled={this.state.newTopicDisabled} />
                </View>
                <View style={layout.topicList}>
                    <PopulatableListView
                        type={'topic'}
                        onFetch={this.getTopics}
                        onPress={this.viewTopic}
                        onLongPress={this.selectTopic}
                        pagination={true}
                        forceUpdate={this.state.forceUpdate}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    newTopicButton: {
        flex: 3
    },

    bigFont: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

const layout = StyleSheet.create({
    container: {
        flex: 1
    },

    searchPanel: {
        flexDirection: 'row',
        padding: 15
    },
    searchBar: {
        flex: 7
    },

    topicList: {
        flex: 1
    },
});

export default BBS;
