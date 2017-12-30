import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { CONVERSATION_MESSAGES_POST, CONVERSATION_MESSAGES_POST_FETCH } from 'helpers/apicalls';
import ActionCable from 'react-native-actioncable';
import { WEBSOCKET_URL } from 'helpers/constants';

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
              received(msg) {
                  if (msg.sender_id != t.props.user.id) {
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

                      t.setState((previousState) => ({
                          messages: GiftedChat.append(previousState.messages, message),
                      }));
                  }
              }
          }
      );

      this.getConversationMessages();
  }

  getConversationMessages(page){
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
        CONVERSATION_MESSAGES_POST(this.props.user.id, this.props.conversation.id, input)
          .then((responseJSON) => {
          })
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: this.props.user.id,
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
