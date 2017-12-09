import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BaseStyles, {PrimaryColor} from 'helpers/styles.js';
import Avatar from 'components/Avatar';

class LiteProfile extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={layout.containerBig}>
                <View style={layout.userDetails}>
                    <View style={layout.container}>
                        {/*<Avatar style={{flex: 1, padding: 3}}image={require('assets/img/a.png')} height={100} width={100}/>*/}
                    </View>
                    <View style={layout.userids}>
                        <Text style={styles.username}>{this.props.user.name}</Text>
                        <Text style={styles.accountid}>{this.props.user.identifier}</Text>
                        <Text style={styles.description}>{this.props.user.blurb}</Text>
                    </View>
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
        textAlign: 'right'
    },

    accountid: {
        fontSize: 18,
        flexWrap: 'wrap',
        textAlign: 'right'
    },

    description: {
        fontSize: 12,
        flexWrap: 'wrap',
        textAlign: 'right',
        fontStyle: 'italic',
        textAlignVertical: 'top'
    }
});

const layout = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: PrimaryColor
    },

    containerBig: {
        borderRadius: 8,
        backgroundColor: '#d3d3d3'
    },

    userDetails: {
        flexDirection: 'row',
    },

    userids: {
        left: 5,
        flex: 1,
        paddingRight: 8
    },
});

export default LiteProfile;
