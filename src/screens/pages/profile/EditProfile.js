import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import TextField from 'react-native-md-textinput';
import Button from 'components/Button';
import DatePicker from 'react-native-datepicker'
import { BaseStyles,  PrimaryColor } from 'helpers/constants.js';
import { USERS_PUT_UPDATE } from 'helpers/apicalls';

class EditProfile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          name: this.props.user.name,
          blurb: this.props.user.blurb,
          birthday: this.props.user.birthday,
        }
        this.updateUserInfo = this.updateUserInfo.bind(this);
    }

    updateUserInfo(){
      USERS_PUT_UPDATE()
    }

    render(){
        return(
            <View style={BaseStyles.container}>
                <View style={layout.textPanel}>
                    <TextInput style={layout.inputBar}
                        value={this.state.name}
                        placeholder={'Screen Name'}
                        selectionColor={PrimaryColor}
                        highlightColor={PrimaryColor}
                        onChangeText={(text) => this.setState({ name: text })}
                        autoCorrect={false}
                        autoCapitalize={'none'}/>
                </View>
                <View style={layout.textPanel}>
                    <TextInput style={layout.inputBar}
                        value={this.state.blurb}
                        placeholder={'Blurb (max. 100 characters)'}
                        selectionColor={PrimaryColor}
                        highlightColor={PrimaryColor}
                        onChangeText={(text) => this.setState({ blurb: text })}
                        autoCorrect={false}
                        autoCapitalize={'none'}/>
                </View>
                <View style={layout.textPanel}>
                    <DatePicker
                        style={layout.inputBar}
                        mode="date"
                        date={this.state.birthday}
                        placeholder="Birthday"
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"
                        maxDate="2100-12-30"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ birthday: date }) }}
                    />
                </View>
                <View style={{padding: 8}}>
                    <Button onPress={this.updateUserInfo}>
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
