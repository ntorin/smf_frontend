import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LongTextInput from 'components/LongTextInput';
import Button from 'components/Button';
import BaseStyles from 'helpers/styles.js';

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
                <LongTextInput/>
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

});

export default ReplyTopic;