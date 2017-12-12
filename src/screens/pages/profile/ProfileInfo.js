import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';
import LiteProfile from 'components/LiteProfile';
import Button from 'components/Button';
import { FRIENDS_POST, FOLLOWS_POST } from 'helpers/apicalls';
import Moment from 'moment';

class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

        this.addFriend = this.addFriend.bind(this);
        this.followUser = this.followUser.bind(this);
    }

    addFriend() {
      FRIENDS_POST(this.props.myUser.id, this.props.user.id)
        .then((responseJSON) => {
          console.log(responseJSON)
        })
    }

    followUser() {
      FOLLOWS_POST(this.props.user.id, this.props.myUser.id)
        .then((responseJSON) => {
          console.log(responseJSON)
        })
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <LiteProfile
                    user={this.props.user} />
                <View style={styles.userDetails}>
                    <View style={layout.userInformation}>
                        <Text style={layout.counts}>Join Date: {Moment(this.props.user.created_at).format('d MMM YYYY')}</Text>
                        <Text style={layout.counts}>Birthday: {this.props.user.birthday}</Text>
                        <Text style={layout.counts}>Posts: {this.props.user.post_count}</Text>
                        <Text style={layout.counts}>Topics: {this.props.user.topic_count}</Text>
                    </View>
                    <View style={layout.containerBadges}>
                    <ScrollView style={styles.containerBadges}>

                    </ScrollView>
                    </View>
                </View>

                <View>
                <Button onPress={this.sendFriendRequest}>
                  Send Friend Request
                </Button>

                <Button onPress={this.followUser}>
                  {"Follow " + this.props.user.name}
                </Button>
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
