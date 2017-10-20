import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import Button from 'components/Button';
import BaseStyles from 'helpers/styles.js';

class CreateTopic extends React.Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
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

                <Button onPress={this.onSubmit}>
                    Create New Topic
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default CreateTopic;