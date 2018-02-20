import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import { BaseStyles } from 'helpers/constants.js';
import { POSTS_POST_FETCH, POSTS_DELETE } from 'helpers/apicalls.js';
import { MarkdownEditor } from 'react-native-markdown-editor';
import Modal from 'components/Modal';
import ModalOptions from 'components/ModalOptions';

class ViewTopic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,

            replyLoading: false,
            replyDisabled: false,
        }

        if (this.props.joinStatus === 'none' || this.props.group_user.is_banned || this.props.topic.is_locked || user.role == 'banned') {
            this.state.replyDisabled = true;
        }


        this.replyTopic = this.replyTopic.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.selectPost = this.selectPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.onModalAction = this.onModalAction.bind(this);

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

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    onModalAction(action, selected) {
        const parts = action.link.split('/');
        switch (parts[0]) {
            case 'screen':
                this.props.navigator.push({
                    screen: parts[1],
                    title: action.name,
                    passProps: {
                        selected: selected.user,
                        group_id: this.props.topic.group_id
                    }
                });
                break;
            case 'function':
                switch (parts[1]) {
                    case 'delete':
                        this.deletePost(selected);
                        break;
                }
        }
        this._hideModal();
    }

    deletePost(selected) {
        POSTS_DELETE(selected.id)
            .then((responseJSON) => {
            });
    }

    getPosts(page, callback, options) {
        POSTS_POST_FETCH(this.props.topic.id, page)
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
    replyTopic() {
        this.setState({ replyLoading: true, replyDisabled: true })
        this.props.navigator.push({
            screen: 'smf_frontend.ReplyTopic',
            title: 'Reply to ' + this.props.topic.title,
            passProps: {
                topic: this.props.topic
            }
        });
        var t = this;
        setTimeout(function () {
            t.setState({ replyLoading: false, replyDisabled: false })
        }, 500)
    };

    renderModal() {
        return (
            <Modal
                onRequestClose={this._hideModal}
                visible={this.state.isModalVisible}>
                <View style={BaseStyles.container}>
                    <Text style={styles.bigFont}>Post Options</Text>
                    <ModalOptions
                        type={'post'}
                        callback={this.onModalAction}
                        group_user={this.props.group_user}
                        selected={this.state.selectedPost}
                    />
                </View>
            </Modal>
        )
    }

    selectPost(rowData) {
        this.setState({ selectedPost: rowData });
        this._showModal();
    }

    viewProfile(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.Profile',
            title: rowData.user.name + "\'s Profile",
            passProps: {
                user: rowData.user
            }
        });
    }

    render() {
        return (
            <View style={layout.container}>
                {this.renderModal()}
                <PopulatableListView
                    type={'post'}
                    onFetch={this.getPosts}
                    onPress={this.viewProfile}
                    onLongPress={this.selectPost}
                />
                <Button
                    title={"Reply"}
                    style={layout.newTopicButton}
                    disabled={this.state.replyDisabled}
                    loading={this.state.replyLoading}
                    onPress={this.replyTopic} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bigFont: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

const layout = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ViewTopic;
