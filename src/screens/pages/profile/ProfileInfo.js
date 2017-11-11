import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BaseStyles from 'helpers/styles.js';
import LiteProfile from 'components/LiteProfile';
import Button from 'components/Button';

class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    addFriend(){

    }

    followUser(){

    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <LiteProfile
                    username={"username"}
                    accountid={"account_id"}
                    description={"description_test -- description_test -- description_test -- description_test -- description_test"} />
                <View style={layout.userInformation}>
                    <Text>join_date</Text>
                    <Text>birthday</Text>
                    <Text>post_count</Text>
                    <Text>topics_created</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    userInformation: {

    }
});

export default ProfileInfo;