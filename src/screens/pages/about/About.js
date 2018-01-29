import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';

class About extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={layout.container}>
                <Image style={styles.appIcon} source={require('assets/img/loginicon.png')} />
                <Text>Version 1.0.0</Text>
                <Text>Created by Iris Inami.</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appIcon: {
        width: 128,
        height: 128
    }
});

const layout = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
    },
});

export default About;