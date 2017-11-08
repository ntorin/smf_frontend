import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'react-native-button';
import BaseStyles from 'helpers/styles.js';

let topic = {
    title: 'title',
    name: 'op_name',
    post_preview: 'gee i sure do love anime! gee i sure do love anime! gee i sure do love anime!',
    post_count: 50,
    topic_tags: [
        {
            name: 'anime'
        },
        {
            name: 'shoujo'
        },
        {
            name: 'thinking'
        }
    ],
    id: 5203
}

let post = {
    name: 'user_name',
    content: 'wow same wow same wow same wow same wow same wow same wow same wow same wow same wow same wow same wow same wow same',
    id: 1023943
}

let user = {
    name: 'user_name',
    handle: 'handle',
    post_count: 5523,
    topic_count: 234,
    follower_count: 49321,
}

let notification = {
    title: 'notification_title',
    message: 'message message message message message message message message',
    is_seen: false
}

class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTopic() {
        rd = topic;
        console.log(this.props.rowData);

        return (
            <View>
                <Text>{rd.title}</Text>
                <Text>{rd.op_name}</Text>
            </View>
        )
    }

    renderPost() {
        rd = post;

        return (
            <View>
                <Text>list_item_post</Text>
            </View>
        )
    }

    renderNotification() {
        rd = notification;

        return (
            <View>
                <Text>list_item_notification</Text>
            </View>
        )
    }

    renderUser() {
        rd = user;

        return (
            <View>
                <Text>list_item_user</Text>
            </View>
        )
    }

    renderItem(type) {
        var toRender;

        switch (type) {
            case 'topic':
                toRender = this.renderTopic();
                break;
            case 'post':
                toRender = this.renderPost();
                break;
            case 'notification':
                toRender = this.renderNotification();
                break;
            default:
                break;
        }

        return toRender;
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <Button onPress={() => this.props.onPress}>
                    {this.renderItem(this.props.type)}
                </Button>
            </View>
        )
    }

}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default ListItem;