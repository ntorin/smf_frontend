import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import BaseStyles from 'helpers/styles.js';
import { POSTS_POST_FETCH } from 'helpers/apicalls.js';
import { MarkdownEditor } from 'react-native-markdown-editor';

class ViewTopic extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.topic.title);
        this.replyTopic = this.replyTopic.bind(this);
        this.getPosts = this.getPosts.bind(this);
    }

    getPosts(page = 1, callback, options) {
        POSTS_POST_FETCH(0, 0, 25, null)
            .then((responseJSON) => {
                console.log(responseJSON);
                callback(responseJSON, {
                    allLoaded: true,
                })
            }); 
        
    }

    replyTopic() {
        this.props.navigator.push({
            screen: 'smf_frontend.ReplyTopic',
            title: 'Reply to rowData.name',
            passProps: {}
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <PopulatableListView
                        type={'post'}
                        onFetch={this.getPosts}
                    />
                <Button style={layout.newTopicButton} onPress={this.replyTopic}>
                    Reply
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
});

export default ViewTopic;