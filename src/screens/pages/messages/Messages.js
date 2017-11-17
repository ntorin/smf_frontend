import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, ListView, RefreshControl } from 'react-native';
import Button from 'components/Button';
import {BaseStyles, NavStyle, PrimaryColor} from 'helpers/styles.js';

var friendList = [
                {
                    friendName: 'salsa',
                    friendLastMessage: 'i lov u',
                    friendMessageDate: new Date().toDateString(),
                    friendNumberUnread: 1,
                },
                {
                    friendName: 'kappa',
                    friendLastMessage: 'keepo',
                    friendMessageDate: new Date().toDateString(),
                    friendNumberUnread: 0,
                },
            ]

var navigatorStyle = NavStyle;

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

    

    renderRow(rowData){
        if(rowData.friendNumberUnread>0){
            return(
                    <Button onPress={() => this.goToChat(rowData)} style={styles.listItem}>
                        <View style={styles.containerMessage}>    
                            <Text style={styles.username}>{rowData.friendName} - </Text>
                            <Text style={styles.message}>{rowData.friendLastMessage} - </Text>
                            <Text style={{textAlign: 'left'}}>Received {rowData.friendMessageDate} </Text>
                        </View>
                        <View style={styles.containerUnread}>
                            <Text style={styles.unread}>{rowData.friendNumberUnread}</Text>
                        </View>
                    </Button>
            )
        }
        else{
            return(
                    <Button onPress={() => this.goToChat(rowData)} style={styles.listItem}>
                        <View style={styles.containerMessage}>    
                            <Text style={styles.username}>{rowData.friendName} - </Text>
                            <Text style={styles.message}>{rowData.friendLastMessage} - </Text>
                            <Text style={{textAlign: 'left'}}>Received {rowData.friendMessageDate} </Text>
                        </View>
                    </Button>
            )
        }
    }

    goToChat(rowData){ 
        this.props.navigator.push({
            screen: 'smf_frontend.Chat',
            title: 'Chat with ' + rowData.friendName,
            passProps: {friend: rowData}
        });
    }

    filterQuery(){

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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10,
    },
    containerUnread: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: '#FF0000',
        alignContent: 'flex-start',
        padding: 4
    },
    containerMessage:{
        flex: 15,
        paddingLeft: 8,
        flexDirection: 'row',
    },
    unread:{
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 16
    },
    username:{
        fontWeight: 'bold',
        textAlign: 'left'
    },
    message:{
        fontStyle: 'italic',
        textAlign: 'left'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    searchBar: {
        textAlign: 'center'
    },

    listItem: {
        flexDirection: 'row'
    },
});

export default Messages;