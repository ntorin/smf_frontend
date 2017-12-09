import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LongTextInput from 'components/LongTextInput';
import Button from 'components/Button';
import BaseStyles from 'helpers/styles.js';
import { MarkdownEditor } from 'react-native-markdown-editor';
import { POSTS_POST } from 'helpers/apicalls';

class ReplyTopic extends React.Component {

    constructor(props){
        super(props);
        this.state = {
        content: '',
        is_anonymous: false,
        }
        this.createPost = this.createPost.bind(this)
    }

    createPost(){
      POSTS_POST(this.props.topic.group_id, this.props.topic.id, this.props.user.id, this.state.content, false, this.state.is_anonymous, null)
        .then((responseJSON) => {
          console.log(responseJSON)
            this.props.navigator.pop({
                animated: true,
                animationType: 'fade'
            });
        })
    }

    render(){
        return(
            <View style={BaseStyles.container}>
                <MarkdownEditor onMarkdownChange={(content) => this.setState({content: content})} />
                <Button onPress={this.createPost}>
                    Send Reply
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    input:{
        paddingTop: 10,
        paddingBottom: 10,
        height: 250,
    }
});

export default ReplyTopic;
