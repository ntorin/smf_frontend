import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import Button from 'components/Button';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';

class EditProfile extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={BaseStyles.container}>
                <View style={layout.textPanel}>
                    <Text style={layout.text}>Handle: </Text>
                    <TextInput style={layout.inputBar}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        autoCorrect={false}
                        autoCapitalize={'none'}/>
                </View>
                <View style={layout.textPanel}>
                    <Text style={layout.text}>Description: </Text>
                    <TextInput style={layout.inputBar}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        autoCorrect={false}
                        autoCapitalize={'none'}/>
                </View>
                <View style={layout.textPanel}>
                    <Text style={layout.text}>Birthday: </Text>
                    <TextInput style={layout.inputBar}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        autoCorrect={false}
                        autoCapitalize={'none'}/>
                </View>
                <View style={{padding: 8}}>
                    <Button>
                        Save
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    textPanel: {
        flexDirection: 'row'
    },
    inputBar: {
        flex: 10
    },
    text:   {
        fontSize: 20,
        flex: 4,
        textAlignVertical: 'center'
    }
});

export default EditProfile;