import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import { BaseStyles, PrimaryColor, user } from 'helpers/constants.js';
import { TOPICS_POST_FETCH } from 'helpers/apicalls.js';
import { iconsMap } from 'helpers/icons-loader';
import Modal from 'components/Modal';

const topicOptions = [
    {

    }
]

class ViewPins extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
        };

        this.viewTopic = this.viewTopic.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.getTopics = this.getTopics.bind(this);
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
                        title: 'Pinned Topics',
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

    getTopics(page, callback, options) {
        TOPICS_POST_FETCH(this.props.group.id, this.state.sort_by, true, this.state.query, page)
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

    viewTopic(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.ViewTopic',
            title: rowData.title,
            passProps: {
                topic: rowData,
                joinStatus: this.props.joinStatus
            }
        });
    }

    renderModal() {
        return (
            <Modal
                onRequestClose={this._hideModal}
                visible={this.state.isModalVisible}>
            </Modal>
        )
    }

    render() {
        return (
            <View style={layout.container}>
                {this.renderModal()}
                <View style={layout.topicList}>
                    <PopulatableListView
                        type={'topic'}
                        onFetch={this.getTopics}
                        onPress={this.viewTopic}
                        onLongPress={this._showModal}
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

export default ViewPins;
