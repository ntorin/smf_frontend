import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';

class Template extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={BaseStyles.container}>
                <TextInput/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default Template;