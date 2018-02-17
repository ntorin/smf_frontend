import React from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';
import { BaseStyles, PrimaryColor } from 'helpers/constants.js';
import { CheckBox } from 'react-native-elements';
import Button from 'components/Button';
import {GROUP_USERS_PUT_UPDATE} from 'helpers/apicalls';

class EditGroupUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            role: this.props.group_user.role,
            is_banned: this.props.group_user.is_banned
        }

        this.updateGroupUser = this.updateGroupUser.bind(this);
        console.log(this.props.group_user);
    }



    updateGroupUser() {
        console.log(this.state.role);
        console.log(this.state.is_banned);
        GROUP_USERS_PUT_UPDATE(this.props.group_user.id, this.state.role, this.state.is_banned)
            .then((responseJSON) => {
                console.log(responseJSON);
                this.props.navigator.pop({
                    animated: true,
                    animationType: 'fade',
                });
            })
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <Picker
                    selectedValue={this.state.role}
                    onValueChange={(itemValue, itemIndex) => this.setState({ role: itemValue })}
                    prompt={'Role'}>
                    <Picker.Item label={"User"} value={"user"} />
                    <Picker.Item label={"Moderator"} value={"moderator"} />
                    {this.props.permissions == 'creator' && <Picker.Item label={"Admin"} value={"admin"} />}
                </Picker>
                <CheckBox
                    title={"Ban user from group"}
                    onPress={() => this.setState({ is_banned: !this.state.is_banned })}
                    checkedIcon={"check-square-o"}
                    checkedColor={PrimaryColor}
                    checked={this.state.is_banned} />
                {this.state.is_banned && <View>
                    <Text>Banned users can still view the group's BBS, but they will be unable to create any topics or posts.</Text>
                </View>}

                <Button
                    title={"Save"}
                    onPress={this.updateGroupUser} />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default EditGroupUser;