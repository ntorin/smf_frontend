import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import TextField from 'react-native-md-textinput';
import Button from 'components/Button';
import DatePicker from 'react-native-datepicker'
import { BaseStyles, PrimaryColor, user, editUser } from 'helpers/constants.js';
import { USERS_PUT_UPDATE } from 'helpers/apicalls';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: user.name,
            blurb: user.blurb,
            birthday: user.birthday,
        }
        this.updateUserInfo = this.updateUserInfo.bind(this);
        
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        switch (event.type) {
            case 'NavBarButtonPress':
                if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                    this.props.navigator.toggleDrawer({
                        side: 'left',
                        animated: true
                    })
                }
                break;

                case 'DeepLink':
                    if (this.state.visible) {
                        const parts = event.link.split('/'); // Link parts
                        const payload = event.payload; // (optional) The payload
                        if (parts[0] == 'nav') {
                            this.props.navigator.push({
                                screen: parts[1],
                                title: payload
                            });
                        }
                    }
                    break;
            }
    
            switch (event.id) {
                case 'willAppear':
                    this.setState({
                        visible: true
                    });
                    break;
                case 'willDisappear':
                    this.setState({
                        visible: false
                    });
                    break;
                case 'bottomTabReselected':
                    this.props.navigator.popToRoot({
                        animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                    });
                    break;
            }
    }

    updateUserInfo() {
        USERS_PUT_UPDATE(this.state.name, this.state.blurb, this.state.birthday)
            .then((responseJSON) => {
                editUser(responseJSON);
                this.props.navigator.handleDeepLink({
                    link: 'user_update',
                    payload: responseJSON
                });

                this.props.navigator.pop({
                    animated: true,
                    animationType: 'fade',
                });
            })
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <View style={layout.textPanel}>
                    <TextInput style={layout.inputBar}
                        value={this.state.name}
                        placeholder={'Screen Name'}
                        selectionColor={PrimaryColor}
                        highlightColor={PrimaryColor}
                        onChangeText={(text) => this.setState({ name: text })}
                        autoCorrect={false}
                        autoCapitalize={'none'} />
                </View>
                <View style={layout.textPanel}>
                    <TextInput style={layout.inputBar}
                        value={this.state.blurb}
                        placeholder={'Blurb (max. 100 characters)'}
                        selectionColor={PrimaryColor}
                        highlightColor={PrimaryColor}
                        onChangeText={(text) => this.setState({ blurb: text })}
                        autoCorrect={false}
                        autoCapitalize={'none'} />
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
                <View style={{ padding: 8 }}>
                    <Button
                        title={"Save"}
                        onPress={this.updateUserInfo} />
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
    text: {
        fontSize: 20,
        flex: 4,
        textAlignVertical: 'center'
    }
});

export default EditProfile;
