import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { CONVERSATION_MESSAGES_POST, CONVERSATION_MESSAGES_POST_FETCH } from 'helpers/apicalls';
import ActionCable from 'react-native-actioncable';
import { WEBSOCKET_URL, user } from 'helpers/constants';

const cable = ActionCable.createConsumer(WEBSOCKET_URL);

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            messageData: [{}],
        };

        var t = this;
        cable.subscriptions.create(
            { channel: "ConversationChannel", room: this.props.conversation.id },
            {
                connected() { console.log('connected') },
                disconnected() { console.log('disconnected') },

                received(event) {
                    console.log(event);
                    switch (event.action) {
                        case 'conversation_message_after_create':
                            t.addMessage(event);
                            break;
                        case 'conversation_message_after_update':
                            t.editMessage(event);
                            break;
                        case 'conversation_message_after_destroy':
                            t.deleteMessage(event);
                            break;
                    }
                }
            }
        );

        this.addMessage = this.addMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);

        this.getConversationMessages();
    }

    addMessage(event) {
        if (event.message.user_id != user.id) {
            var message = {
                _id: event.message.id,
                text: event.message.message,
                createdAt: new Date(event.message.created_at),
                user: {
                    _id: event.message.user_id,
                    name: event.name,
                    avatar: ''
                }
            }

            this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, message),
            }));
        }
    }

    editMessage(event){
        messageList = this.state.messages;
        messageList.forEach(function (msg, index){
            if(msg._id == event.message.id){
                messageList[index].text = event.message.message;
                this.setState({messages: messageList});
                return;
            }
        });
    }

    deleteMessage(event){
        messageList = this.state.messages;
        messageList.forEach(function (msg, index){
            if(msg._id == event.message.id){
                messageList.splice(index, 1);
                this.setState({messages: messageList});
                return;
            }
        });
    }

    getConversationMessages(page) {
        CONVERSATION_MESSAGES_POST_FETCH(this.props.conversation.id, page)
            .then((responseJSON) => {
                var currMessages = [];
                responseJSON.forEach(function (msg) {
                    var message = {
                        _id: msg.id,
                        text: msg.message,
                        createdAt: new Date(msg.created_at),
                        user: {
                            _id: msg.user_id,
                            name: msg.user.name,
                            avatar: ''
                        }
                    }
                    currMessages.push(message);
                }, this);
                this.setState((previousState) => ({ messages: GiftedChat.append(previousState.messages, currMessages) }))
            })
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        var input = messages[0].text;
        CONVERSATION_MESSAGES_POST(this.props.conversation.id, input)
            .then((responseJSON) => {
            })
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: user.id,
                }}
            />
        );
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

export default Chat;
