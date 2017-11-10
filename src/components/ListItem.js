import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'react-native-button';
import BaseStyles from 'helpers/styles.js';

let topic = {
    title: 'I Love Anime!',
    name: 'pummelo',
    post_preview: 'gee i sure do love anime! gee i sure do love anime! gee i sure do love anime! gee i sure do love anime! and i think there should be a 150 character li',
    post_count: 74,
    topic_tags: [
        {
            name: 'anime'
        },
        {
            name: 'weeb'
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
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={layout.title}>{rd.title}</Text>
                    <View style={layout.nameCount}>
                       <Text>by {rd.name}</Text>
                       <Text style={layout.count}>{rd.post_count} posts</Text>
                    </View>
                    <Text>{rd.post_preview}...</Text>
                    <Text>tags: {rd.topic_tags[0].name}, {rd.topic_tags[1].name}, {rd.topic_tags[2].name}</Text>
                </View>
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
            <View>
                <Button onPress={() => this.props.onPress}>
                    {this.renderItem(this.props.type)}
                </Button>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: '#d3d3d3'
    },
    textContainer:  {
        padding: 10
    }
});

const layout = StyleSheet.create({
    title: {
        fontSize: 20
    },
    nameCount: {
        flexDirection: 'row',
        
    },
    name: {
        flex: 1
    },
    count: {
        textAlign: 'right',
        flex: 1
    }
});

export default ListItem;