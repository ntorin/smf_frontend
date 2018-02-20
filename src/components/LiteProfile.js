import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles, PrimaryColor, WEBSOCKET_URL, user, editUser } from 'helpers/constants.js';
import Avatar from 'components/Avatar';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionCable from 'react-native-actioncable';

const cable = ActionCable.createConsumer(WEBSOCKET_URL);

class LiteProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        }
        this.updateProfile = this.updateProfile.bind(this);
        
        var t = this;
        cable.subscriptions.create(
            { channel: "ProfileChannel", room: user.id },
            {
                connected() {
                    console.log('connected to profile');
                },
                disconnected() { console.log('disconnected') },
    
                received(event) {
                    switch (event.action) {
                        case 'profile_update':
                            t.updateProfile(event);
                            break;
                    }
                }
            }
        );
    }

    updateProfile(event){
        this.setState({user: event.user})
        editUser(event.user);
    }

    render() {
        return (
            <View style={layout.container}>
                <View style={layout.userDetails}>
                    <View style={layout.row}>
                        <Text style={[{ flex: 1 }, styles.username]}>{this.state.user.name}</Text>
                        <View style={[{ flex: 1, }, layout.row, layout.flexEnd, styles.alignRight]}>
                            <MaterialCommunityIconsIcon
                                name={"coins"}
                                color={PrimaryColor}
                                size={25} />
                            <Text style={styles.mediumFont}>{this.state.user.credits}</Text>
                        </View>
                    </View>
                    <Text style={styles.accountid}>{this.state.user.identifier}</Text>
                    <Text style={styles.description}>{this.state.user.blurb}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },

    accountid: {
        fontSize: 18,
        flexWrap: 'wrap',
    },

    description: {
        fontSize: 12,
        flexWrap: 'wrap',
        fontStyle: 'italic',
        textAlignVertical: 'top'
    },

    alignRight: {
        textAlign: 'right',
    },

    mediumFont: {
        fontSize: 20,
    },
});

const layout = StyleSheet.create({
    container: {
    },

    flexEnd: {
        flex: 1,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
    },

    row: {
        flexDirection: 'row'
    },

    userDetails: {
    },

    userids: {
        left: 5,
        flex: 1,
        paddingRight: 8
    },
});

export default LiteProfile;
