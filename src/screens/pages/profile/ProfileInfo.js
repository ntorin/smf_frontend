import React from 'react';
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native';
import { BaseStyles, PrimaryColor, ANDROID_ADMOB_AD_UNIT_ID, WEBSOCKET_URL } from 'helpers/constants.js';
import LiteProfile from 'components/LiteProfile';
import Button from 'components/Button';
import { FRIENDS_POST, FRIENDS_POST_CHECK_REQUEST, FRIENDS_DELETE, FOLLOWS_POST, FOLLOWS_POST_CHECK_REQUEST, FOLLOWS_DELETE } from 'helpers/apicalls';
import Moment from 'moment';
import { user } from 'helpers/constants';
import { AdMobBanner, AdMobRewarded, PublisherBanner } from 'react-native-admob';

const cable = ActionCable.createConsumer(WEBSOCKET_URL);

class ProfileInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      friendStatus: '',
      friendLoading: true,
      friendDisabled: false,

      followStatus: '',
      followLoading: true,
      followDisabled: false,
      user: this.props.user
    }

    this.viewGroups = this.viewGroups.bind(this);
    this.viewFollows = this.viewFollows.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.followUser = this.followUser.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.checkFriend = this.checkFriend.bind(this);
    this.checkFollow = this.checkFollow.bind(this);
    this.renderFriendButton = this.renderFriendButton.bind(this);
    this.renderFollowButton = this.renderFollowButton.bind(this);

    this.checkFriend();
    this.checkFollow();
  }

  checkFriend() {
    FRIENDS_POST_CHECK_REQUEST(this.props.user.id)
      .then((responseJSON) => {
        this.setState({
          friend: responseJSON.friend,
          friendStatus: responseJSON.status, friendLoading: false, followDisabled: false
        })
      })
  }

  addFriend() {
    this.setState({ friendLoading: true, followDisabled: true })
    FRIENDS_POST(user.id, this.props.user.id)
      .then((responseJSON) => {
        this.checkFriend();
      })
  }

  deleteFriend() {
    Alert.alert('Remove Friend',
      'Are you sure you want to remove ' + this.props.user.name + ' from your Friends List?',
      [{
        text: 'YES', onPress: () => {
          this.setState({ friendLoading: true, followDisabled: true })
          FRIENDS_DELETE(this.state.friend.id)
            .then((responseJSON) => {
              this.checkFriend();
            })
        }
      },
      { text: 'NO' }]);
  }

  checkFollow() {
    FOLLOWS_POST_CHECK_REQUEST(this.props.user.id)
      .then((responseJSON) => {
        this.setState({
          follow: responseJSON.follow,
          followStatus: responseJSON.status, followLoading: false,
          friendDisabled: false
        })
      })
  }

  followUser() {
    this.setState({ followLoading: true, friendDisabled: true })
    FOLLOWS_POST(this.props.user.id)
      .then((responseJSON) => {
        this.checkFollow();
      })
  }

  unfollowUser() {
    this.setState({ followLoading: true, friendDisabled: true })
    FOLLOWS_DELETE(this.state.follow.id)
      .then((responseJSON) => {
        this.checkFollow();
      })
  }

  viewGroups() {
    this.props.navigator.push({
      screen: 'smf_frontend.UserGroups',
      title: this.props.user.name + '\'s groups',
      passProps: {
        user: this.props.user
      }
    });
  }

  viewFollows() {
    this.props.navigator.push({
      screen: 'smf_frontend.UserFollows',
      title: this.props.user.name + '\'s follows',
      passProps: {
        user: this.props.user
      }
    });
  }

  renderFriendButton() {
    if (user.id != this.props.user.id) {
      switch (this.state.friendStatus) {
        case 'friends':
          return (
            <Button
              title={"Unfriend"}
              style={layout.button}
              onPress={this.deleteFriend}
              loading={this.state.friendLoading}
              disabled={this.state.friendDisabled} />
          )
          break;

        case 'awaiting response':
          return (
            <Button
              title={"Cancel Friend Request"}
              style={layout.button}
              onPress={this.deleteFriend}
              loading={this.state.friendLoading}
              disabled={this.state.friendDisabled} />
          )
          break;

        case 'accept request':
          return (
            <Button
              title={"Accept Friend Request"}
              style={layout.button}
              onPress={this.addFriend}
              loading={this.state.friendLoading}
              disabled={this.state.friendDisabled} />
          )
          break;

        case 'none':
          return (
            <Button
              title={"Send Friend Request"}
              style={layout.button}
              onPress={this.addFriend}
              loading={this.state.friendLoading}
              disabled={this.state.friendDisabled} />
          )
          break;
      }
    }
  }

  renderFollowButton() {
    if (user.id != this.props.user.id) {
      switch (this.state.followStatus) {
        case 'followed':
          return (
              <Button
                title={"Unfollow"}
                style={layout.button}
                onPress={this.unfollowUser}
                loading={this.state.followLoading}
                disabled={this.state.followDisabled} />
          )
          break;

        case 'none':
          return (
              <Button
                title={"Follow"}
                style={layout.button}
                onPress={this.followUser}
                loading={this.state.followLoading}
                disabled={this.state.followDisabled} />
          )
          break;
      }
    }

  }

  render() {
    return (
      <View style={BaseStyles.container}>
      <View style={{flex:1}}>
        <LiteProfile
          user={this.state.user} />
        <View style={styles.userDetails}>
          <View style={layout.userInformation}>
            <Text style={layout.counts}>Join Date: {Moment(this.props.user.created_at).format('DD MMM YYYY')}</Text>
            <Text style={layout.counts}>Birthday: {this.props.user.birthday}</Text>
            <Text style={layout.counts}>Posts: {this.props.user.post_count}</Text>
            <Text style={layout.counts}>Topics: {this.props.user.topic_count}</Text>
            <Text style={layout.counts}>Referrals: {this.props.user.referral_count}</Text>
          </View>
        </View>
        </View>
        <View style={{flex:1, alignContent: 'flex-start', alignItems: 'flex-start'}}>
        <View style={[layout.row, {flex:1, marginTop: 5}]}>
            <Button
              title={"View Groups"}
              style={layout.button}
              onPress={this.viewGroups} />
            <Button
              title={"View Follows"}
              style={layout.button}
              onPress={this.viewFollows} />
        </View>
        <View style={[layout.row, {flex: 1}]}>
          {this.renderFollowButton()}
          {this.renderFriendButton()}
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
  },

  row: {
    flexDirection: 'row'
  },

  button: {
    flex: 1
  }
});

export default ProfileInfo;
