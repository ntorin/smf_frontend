import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BaseStyles from 'helpers/styles';
import { gotoHome } from 'helpers/functions';

class Welcome extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={BaseStyles.container}>
              <Text>Welcome</Text>
              <View style={layout.subContainer}>

              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default Welcome;
