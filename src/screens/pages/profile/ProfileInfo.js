import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';
import LiteProfile from 'components/LiteProfile';
import Button from 'components/Button';

class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    addFriend() {

    }

    followUser() {

    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <LiteProfile
                    username={"Citron"}
                    accountid={"iluvpomelo"}
                    description={"im a weeb XD im a weeb XD im a weeb XD im a weeb XD im a weeb XD im a weeb XD im a weeb XD im a weeb XD"} />
                <View style={styles.userDetails}>
                    <View style={layout.userInformation}>
                        <Text style={layout.counts}>Join Date: 11/13/2017</Text>
                        <Text style={layout.counts}>Birthday: 11/13/1996</Text>
                        <Text style={layout.counts}>Posts: 24583</Text>
                        <Text style={layout.counts}>Topics: 1032</Text>
                    </View>
                    <View style={layout.containerBadges}>
                    <ScrollView style={styles.containerBadges}>

                    </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userDetails: {
        paddingTop: 8,
        flexDirection: 'row'
    },
    containerBadges: {
        backgroundColor: PrimaryColor,
        borderRadius: 8,
    }
});

const layout = StyleSheet.create({
    userInformation: {
        flex: 2
    },
    counts: {
        flexWrap: 'wrap',
    },
    containerBadges: {
        flex: 3
    }
});

export default ProfileInfo;