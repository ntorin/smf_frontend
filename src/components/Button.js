import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles, PrimaryColor } from 'helpers/constants.js';
import { Button as RNEButton } from 'react-native-elements'

class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <RNEButton
                title={this.props.title}
                icon={this.props.icon}
                onPress={this.props.onPress}
                textStyle={styles.textStyle}
                large={this.props.large}
                loading={this.props.loading}
                disabled={this.props.disabled}
                backgroundColor={PrimaryColor}
                borderRadius={8}
                style={this.props.style}
            />
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
        borderWidth: 8
    }
});

const layout = StyleSheet.create({

});

export default Button;
