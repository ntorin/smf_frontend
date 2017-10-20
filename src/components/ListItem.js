import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'react-native-button';
import BaseStyles from 'helpers/styles.js';

class ListItem extends React.Component {

    constructor(props){
        super(props);
    }

    renderItem(type){
        switch(type){
            case '':
            break;
            default:
            break;
        }
    }

    render(){
        return(
            <View style={BaseStyles.container}>
            <Button onPress={() => this.props.onPress('aa')}>
                <Text>list_item</Text>
                {this.renderItem(this.props.type)}
            </Button>
            </View>
        )
    }

}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default ListItem;