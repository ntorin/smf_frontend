import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles, PrimaryColor} from 'helpers/constants.js';
import Avatar from 'components/Avatar';

class LiteProfile extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={layout.container}>
                <View style={layout.userDetails}>
                        <Text style={styles.username}>{this.props.user.name}</Text>
                        <Text style={styles.accountid}>{this.props.user.identifier}</Text>
                        <Text style={styles.description}>{this.props.user.blurb}</Text>
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
    }
});

const layout = StyleSheet.create({
    container: {
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
