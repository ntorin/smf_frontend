import React from 'react';
import { StyleSheet, View, Text, Keyboard, Alert } from 'react-native';
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
            isEditingContent: false,
        }

        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        this.createPost = this.createPost.bind(this)

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        switch (event.type) {
            case 'NavBarButtonPress':
                if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                    this.props.navigator.toggleDrawer({
                        side: 'left',
                        animated: true
                    })
                }
                break;

            case 'DeepLink':
                this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
                    isVisible = responseJSON
                    if (isVisible) {
                        const parts = event.link.split('/'); // Link parts
                        const payload = event.payload; // (optional) The payload
                        if (parts[0] == 'nav') {
                            this.props.navigator.push({
                                screen: parts[1],
                                title: payload
                            });
                            // handle the link somehow, usually run a this.props.navigator command
                        }
                    }
                });
                break;
        }

        switch (event.id) {
            case 'bottomTabReselected':
                this.props.navigator.popToRoot({
                    animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                    animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                });
                break;
        }
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.setState({ keyboardVisible: true });
    }

    _keyboardDidHide() {
        this.setState({ keyboardVisible: false, isEditingContent: false });
    }

    createPost() {
        Alert.alert('Create Post', 'Are you sure you want to send this message?', [{
            text: 'YES', onPress: () => {
                POSTS_POST(this.props.topic.group_id, this.props.topic.id, this.state.content, false, this.state.is_anonymous, null)
                    .then((responseJSON) => {
                        this.props.callback();
                        this.props.navigator.pop({
                            animated: true,
                            animationType: 'fade'
                        });
                    })
            }
        }, {text: 'NO'}])
    }

    submissionIsInvalid() {
        return this.state.content.trim() === '' || this.state.content.length > 5000 ? true : false;
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <MarkdownEditor onMarkdownChange={(content) => this.setState({ content: content, isEditingContent: true })} />
                <Text>{this.state.content.length + "/5000 characters"}</Text>
                {!this.state.keyboardVisible && <Button
                    title={"Send Reply"}
                    onPress={this.createPost}
                    disabled={this.submissionIsInvalid()} />}
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
