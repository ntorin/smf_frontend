import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { BaseStyles,  PrimaryColor } from 'helpers/constants.js';
import LiteProfile from 'components/LiteProfile';
import Button from 'components/Button';
import { FRIENDS_POST, FOLLOWS_POST } from 'helpers/apicalls';
import Moment from 'moment';

class ProfileInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          friendLoading: false,
          friendDisabled: false,
          followLoading: false,
          followDisabled: false
        }

        this.addFriend = this.addFriend.bind(this);
        this.followUser = this.followUser.bind(this);
    }

    addFriend() {
      this.setState({friendLoading: true, followDisabled: true})
      FRIENDS_POST(this.props.myUser.id, this.props.user.id)
        .then((responseJSON) => {
          console.log(responseJSON)
            this.setState({friendLoading: false, followDisabled: false})
        })
    }

    followUser() {
      this.setState({followLoading: true, friendDisabled: true})
      FOLLOWS_POST(this.props.user.id, this.props.myUser.id)
        .then((responseJSON) => {
          console.log(responseJSON)
            this.setState({followLoading: false, friendDisabled: false})
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
                </View>

                <View style={layout.row}>
                <Button style={layout.button} onPress={this.followUser} isLoading={this.state.followLoading} isDisabled={this.state.followDisabled}>
                  {"Follow " + this.props.user.name}
                </Button>
                <Button style={layout.button} onPress={this.addFriend} isLoading={this.state.friendLoading} isDisabled={this.state.friendDisabled}>
                  Send Friend Request
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
    },

    row: {
      flexDirection: 'row'
    },

    button: {
      flex: 1
    }
});

export default ProfileInfo;
