import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'components/Button';
import PopulatableListView from 'components/PopulatableListView';
import ActionCable from 'react-native-actioncable';
import { BaseStyles, NavStyle, PrimaryColor, user } from 'helpers/constants.js';
import { CONVERSATIONS_POST_FETCH } from 'helpers/apicalls';

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            sort_by: 'recent',
        };

        this.getConversations = this.getConversations.bind(this);
        this.goToChat = this.goToChat.bind(this);
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
        case 'didAppear':
          this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
            isVisible = responseJSON;
            console.log('feed appeared; ' + isVisible);
          });
          break;
        case 'didDisappear':
          this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
            isVisible = responseJSON;
            console.log('feed disappeared; ' + isVisible);
          });
          break;
      }
    }

    getConversations(page, callback, options) {
        CONVERSATIONS_POST_FETCH(this.state.sort_by, this.state.query, page)
            .then((responseJSON) => {
                callback(responseJSON, {
                    allLoaded: true
                })
            })
    }

    goToChat(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.Chat',
            title: rowData.name,
            passProps: { conversation: rowData }
        });
    }

    filterQuery() {

    }

    render() {
        return (
            <View style={layout.container}>
                <View style={layout.conversationList}>
                    <PopulatableListView
                        type={'conversation'}
                        onFetch={this.getConversations}
                        onPress={this.goToChat}
                        pagination={true}
                    />
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
});

const layout = StyleSheet.create({
    container: {

    },

    conversationList: {

    }
});

export default Messages;
