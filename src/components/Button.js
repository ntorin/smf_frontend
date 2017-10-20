import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {BaseStyles, PrimaryColor} from 'helpers/styles.js';
import APSLButton from 'apsl-react-native-button'

class Button extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <APSLButton 
            onPress={this.props.onPress}
            textStyle={styles.textStyle}
            style={[styles.style, this.props.style]}>
            {this.props.children}
            </APSLButton>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: '#FFFFFF'
    },

    style: {
        borderColor: PrimaryColor,
        backgroundColor: PrimaryColor,
        borderWidth: 1
    }
});

const layout = StyleSheet.create({

});

export default Button;