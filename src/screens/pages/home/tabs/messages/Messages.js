import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'apsl-react-native-button';

var friendList = [
                {
                    friendName: 'FRIENDNAME',
                    friendLastMessage: 'FRIENDLASTMESSAGE',
                    friendMessageDate: new Date().toDateString(),
                    friendNumberUnread: 1,
                },
            ]

class Messages extends React.Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            refreshing: false,
            friendList: friendList,
            friends: ds.cloneWithRows(friendList)
        };
        
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.fetchFriends().then(() => {
            this.setState({ refreshing: false });
        });
    }

    fetchFriends() {
        //get list of friend chats
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder={'🔎 Search...'} autoCorrect={false} autoCapitalize={'none'}
                    keyboardType={'web-search'} onSubmitEditing={() => this.filterQuery()} style={styles.searchBar} />
                <ListView
                    dataSource={this.state.friends}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                    renderRow={this.renderRow.bind(this)} />

            </View>
        )
    }

    renderRow(rowData){
        return(
                <Button onPress={() => this.goToChat(rowData)} style={styles.listItem}>
                    <Text>{rowData.friendName}</Text>
                    <Text>{rowData.friendLastMessage}</Text>
                    <Text>{rowData.friendMessageDate}</Text>
                    <Text>{rowData.friendNumberUnread}</Text>
                </Button>
        )
    }

    goToChat(rowData){ 
        this.props.navigator.push({
            screen: 'storytime_buddies_frontend.Chat',
            title: 'Chat with RECIPIENT_USERNAME',
            passProps: {friend: rowData}
        });
    }

    filterQuery(){

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    searchBar: {
        textAlign: 'center'
    },

    listItem: {
        borderWidth: 0
    },
});

export default Messages;