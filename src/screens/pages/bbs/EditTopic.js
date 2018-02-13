import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';

class EditTopic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.selected.title,
            
        }
        console.log(this.props.selected);
    }

    render() {
        return (
            <View style={BaseStyles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default EditTopic;