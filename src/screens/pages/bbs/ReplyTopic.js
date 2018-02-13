import React from 'react';
import { StyleSheet, View, Text, Keyboard } from 'react-native';
import LongTextInput from 'components/LongTextInput';
import Button from 'components/Button';
import { BaseStyles } from 'helpers/constants.js';
import { MarkdownEditor } from 'react-native-markdown-editor';
import { POSTS_POST } from 'helpers/apicalls';

class ReplyTopic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: '',
            is_anonymous: false,
        }

        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.createPost = this.createPost.bind(this)
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.setState({ keyboardVisible: true });
    }

    _keyboardDidHide() {
        this.setState({ keyboardVisible: false });
    }

    createPost() {
        POSTS_POST(this.props.topic.group_id, this.props.topic.id, this.state.content, false, this.state.is_anonymous, null)
            .then((responseJSON) => {
                this.props.navigator.pop({
                    animated: true,
                    animationType: 'fade'
                });
            })
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <MarkdownEditor onMarkdownChange={(content) => this.setState({ content: content })} />
                {!this.state.keyboardVisible && <Button title={"Send Reply"} onPress={this.createPost}>
                    Send Reply
                </Button>}
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    input: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 250,
    }
});

export default ReplyTopic;
