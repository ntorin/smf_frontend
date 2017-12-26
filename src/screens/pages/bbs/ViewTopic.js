import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import { BaseStyles } from 'helpers/constants.js';
import { POSTS_POST_FETCH } from 'helpers/apicalls.js';
import { MarkdownEditor } from 'react-native-markdown-editor';

class ViewTopic extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.topic.title);
        this.replyTopic = this.replyTopic.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.quotePost = this.quotePost.bind(this);
    }

    getPosts(page, callback, options) {
        POSTS_POST_FETCH(this.props.topic.id, page)
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
            title: 'Reply to ' + this.props.topic.title,
            passProps: {
              topic: this.props.topic,
              user: this.props.user
            }
        });
    };

    quotePost(){

    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <PopulatableListView
                        type={'post'}
                        onFetch={this.getPosts}
                        onPress={this.quotePost}
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
