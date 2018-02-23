import React from 'react';
import { StyleSheet, View, Text, Alert, Dimensions, Image, TextInput, ListView, RefreshControl, Platform } from 'react-native';
import Button from 'components/Button';
import PopulatableListView from 'components/PopulatableListView';
import ActionCable from 'react-native-actioncable';
import { BaseStyles, NavStyle, PrimaryColor, user, WEBSOCKET_URL } from 'helpers/constants.js';
import { CONVERSATIONS_POST_FETCH, CONVERSATION_USERS_PUT_UPDATE } from 'helpers/apicalls';
import PushNotification from 'react-native-push-notification';
import Modal from 'components/Modal';
import ModalOptions from 'components/ModalOptions';

const cable = ActionCable.createConsumer(WEBSOCKET_URL);

PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );

        // process the notification
        
        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
});

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,

            query: '',
            sort_by: 'recent',
            forceUpdate: false,

            selectedConversation: {}
        };

        var t = this;
        cable.subscriptions.create(
            { channel: "ConversationChannel", room: 'uid_' + user.id },
            {
                connected() {
                    console.log('connected to conversation');
                },
                disconnected() { console.log('disconnected') },

                received(event) {
                    console.log(event);
                    switch (event.action) {
                        case 'conversation_message_after_create':
                            t.sendMessageNotification(event);
                            break;
                        case 'create_conversation':
                            t.refreshConversations()
                            break;
                    }
                }
            }
        );

        this.getConversations = this.getConversations.bind(this);
        this.goToChat = this.goToChat.bind(this);
        this.onModalAction = this.onModalAction.bind(this);
        this.selectConversation = this.selectConversation.bind(this);
        this.muteConversation = this.muteConversation.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.refreshConversations = this.refreshConversations.bind(this);

    }

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    refreshConversations(){
        console.log('refreshing');
        this.setState({forceUpdate: true});
    }

    sendMessageNotification(event) {
        console.log('sendMessageNotification: ' + event);
        if (event.sender_id != user.id) {
            PushNotification.localNotification({
                /* Android Only Properties */
                id: parseInt(event.conversation.id), // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
                smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
                
                /* iOS and Android properties */
                title: event.name, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
                message: Platform.OS === 'ios' ? event.name + ": " + event.conversation.last_message : event.conversation.last_message, // (required)
                //number: parseInt(event.conversation.id) + 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                playSound: false, // (optional) default: true
            });
            this.setState({forceUpdate: true})
        }
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

    onModalAction(action, selected) {
        const parts = action.link.split('/');
        switch (parts[0]) {
            case 'screen':
                this.props.navigator.push({
                    screen: parts[1],
                    title: action.name,
                    passProps: { selected: selected }
                });
                break;
            case 'function':
                switch (parts[1]) {
                    case 'mute':
                        this.muteConversation();
                        break;
                }
        }
        this._hideModal();
    }

    selectConversation(rowData) {
        this.setState({ selectedConversation: rowData });
        this.muteConversation();
    }

    muteConversation() {
        if (!this.state.selectedConversation.is_muted) {
            Alert.alert('Mute Conversation', 'Would you like to mute this conversation?',
                [{
                    text: "YES", onPress: () => {
                        CONVERSATION_USERS_PUT_UPDATE(this.state.selectedConversation.id, true)
                            .then((responseJSON) => {
                                this.setState({ forceUpdate: true })
                            })
                    }
                },
                { text: "NO" }])
        } else {
            Alert.alert('Unmute Conversation', 'Would you like to unmute this conversation?',
                [{
                    text: "YES", onPress: () => {
                        CONVERSATION_USERS_PUT_UPDATE(this.state.selectedConversation.id, false)
                            .then((responseJSON) => {
                                this.setState({ forceUpdate: true })
                            })
                    }
                },
                { text: "NO" }])
        }
    }

    getConversations(page, callback, options) {
        CONVERSATIONS_POST_FETCH(this.state.sort_by, this.state.query, page)
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

    goToChat(rowData) {
        console.log(rowData);
        this.props.navigator.push({
            screen: 'smf_frontend.Chat',
            title: rowData.conversation.name,
            passProps: { conversation: rowData.conversation }
        });
    }

    filterQuery() {

    }

    renderModal() {
        return (
            <Modal
                onRequestClose={this._hideModal}
                visible={this.state.isModalVisible}>
                <View style={BaseStyles.container}>
                    <Text style={styles.bigFont}>Conversation Options</Text>
                    <ModalOptions
                        type={'conversation'}
                        callback={this.onModalAction}
                        selected={this.state.selectedMessage}
                    />
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <View style={layout.container}>
                {this.renderModal()}
                <View style={layout.conversationList}>
                    <PopulatableListView
                        type={'conversation'}
                        onFetch={this.getConversations}
                        onPress={this.goToChat}
                        onLongPress={this.selectConversation}
                        pagination={true}
                        forceUpdate={this.state.forceUpdate}
                    />
                </View>
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

    },

    conversationList: {

    }
});

export default Messages;
