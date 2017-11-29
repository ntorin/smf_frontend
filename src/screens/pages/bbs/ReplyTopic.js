import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LongTextInput from 'components/LongTextInput';
import Button from 'components/Button';
import BaseStyles from 'helpers/styles.js';
import { MarkdownEditor } from 'react-native-markdown-editor';

class ReplyTopic extends React.Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(){
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade'
        });
    }

    render(){
        return(
            <View style={BaseStyles.container}>
                <MarkdownEditor onMarkdownChange={this.onTextChange} />
                <Button onPress={this.onSubmit}>
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