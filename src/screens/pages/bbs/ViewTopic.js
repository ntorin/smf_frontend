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
        this.state = {
            replyLoading: false,
            replyDisabled: false,
        }

        if (this.props.joinStatus === 'none') {
            this.state.replyDisabled = true;
        }


        this.replyTopic = this.replyTopic.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.quotePost = this.quotePost.bind(this);
    }

    getPosts(page, callback, options) {
        POSTS_POST_FETCH(this.props.topic.id, page)
            .then((responseJSON) => {
                callback(responseJSON, {
                    allLoaded: true,
                })
            });
    }
    replyTopic() {
        this.setState({ replyLoading: true, replyDisabled: true })
        this.props.navigator.push({
            screen: 'smf_frontend.ReplyTopic',
            title: 'Reply to ' + this.props.topic.title,
            passProps: {
                topic: this.props.topic
            }
        });
        var t = this;
        setTimeout(function () {
            t.setState({ replyLoading: false, replyDisabled: false })
        }, 500)
    };

    quotePost() {

    }

    render() {
        return (
            <View style={layout.container}>
                <PopulatableListView
                    type={'post'}
                    onFetch={this.getPosts}
                    onPress={this.quotePost}
                />
                <Button
                    title={"Reply"}
                    style={layout.newTopicButton}
                    disabled={this.state.replyDisabled}
                    loading={this.state.replyLoading}
                    onPress={this.replyTopic}>
                    Reply
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ViewTopic;
