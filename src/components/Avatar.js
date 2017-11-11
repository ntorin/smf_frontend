import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import BaseStyles from 'helpers/styles.js';
import Button from 'react-native-button';

class Avatar extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
                <Button containerStyle={[layout.containerStyle, {height: this.props.height, width: this.props.width}]}>
                    <Image style={layout.avatar} source={this.props.image} resizeMode={'contain'} height={this.props.height} width={this.props.width}/>
                    <View style={layout.username}>
                        <Text style={[styles.username, layout.username]}>SMF</Text>
                    </View>
                </Button>
        )
    }
}

const styles = StyleSheet.create({
    username: {
        fontSize: 30,
        color: '#FFFFFF',
    }
});

const layout = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerStyle: {
        borderRadius: 4,
    },

    avatar: {
    },

    username: {
        flex: 1,
    }
});

export default Avatar;