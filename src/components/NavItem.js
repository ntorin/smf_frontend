import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import { iconsMap, iconsLoaded } from 'helpers/icons-loader';
import Button from 'react-native-button';


class NavItem extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button onPress={() => this.props.onPress(this.props.rowData)}>
            <View style={layout.container}>
                <Image source={this.props.icon}/>
                <Text style={layout.text}>{this.props.text}</Text>           
            </View>
            </Button>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5
    },

    text: {
        left: 5,
        fontSize: 16
    }
});

export default NavItem;