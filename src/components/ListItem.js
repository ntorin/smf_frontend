import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'react-native-button';
import BaseStyles from 'helpers/styles.js';

let topic = {
    title: 'title',
    op_name: 'op_name',
    post_count: 50,
}

let post = {
    //...
}

class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTopic() {
        rd = this.props.rowData;
        console.log(this.props.rowData);

        return (
            <View>
                <Text>{rd.title}</Text>
                <Text>{rd.op_name}</Text>
            </View>
        )
    }

    renderPost() {
        rd = this.props.rowData;

        return (
            <View>
                <Text>list_item_post</Text>
            </View>
        )
    }

    renderNotification() {
        rd = this.props.rowData;

        return (
            <View>
                <Text>list_item_notification</Text>
            </View>
        )
    }

    renderUser() {
        rd = this.props.rowData;

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