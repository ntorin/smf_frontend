import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BaseStyles from 'helpers/styles.js';
import Avatar from 'components/Avatar';

class LiteProfile extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={layout.userDetails}>
                {<Avatar image={require('assets/img/a.png')} height={100} width={100}/>}
                
                <View style={layout.userids}>
                    <Text style={styles.username}>{this.props.username}</Text>
                    <Text style={styles.accountid}>{this.props.accountid}</Text>
                    <Text style={styles.description}>{this.props.description}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        flexWrap: 'wrap'
    },

    accountid: {
        fontSize: 16,
        flexWrap: 'wrap'
    },

    description: {
        fontSize: 12,
        flexWrap: 'wrap'
    }
});

const layout = StyleSheet.create({
    container: {
        flex: 1
    },
    
    userDetails: {
        flexDirection: 'row'
    },

    userids: {
        left: 5
    },
});

export default LiteProfile;