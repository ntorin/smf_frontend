import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';
import BaseStyles from 'helpers/styles.js';

class Settings extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={BaseStyles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
});

export default Settings;
