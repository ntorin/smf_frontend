import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BaseStyles from 'helpers/styles.js';
import { PrimaryColor, NavNoElevation } from 'helpers/styles';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import { FRIENDS_FETCH, FRIENDS_POST, FRIENDS_POST_ACCEPT_REQUEST } from 'helpers/apicalls';

class Friends extends React.Component {

  static navigatorStyle = NavNoElevation;


  Friends = () => <PopulatableListView
                    type={'user'}
                    onFetch={this.getFriends}
                    onPress={this.viewProfile} />;

  Incoming = () => <PopulatableListView
                    type={'user'}
                    onFetch={this.getIncoming}
                    onPress={this.viewProfile} />;

  Outgoing = () => <PopulatableListView
                    type={'user'}
                    onFetch={this.getOutgoing}
                    onPress={this.viewProfile} />;

    constructor(props){
        super(props);
        this.state = {
          index: 0,
          routes: [
            { key: '1', title: 'Friends' },
            { key: '3', title: 'Incoming' },
            { key: '2', title: 'Outgoing' },
          ],
        };

        this.getFriends = this.getFriends.bind(this);
        this.getIncoming = this.getIncoming.bind(this);
        this.getOutgoing = this.getOutgoing.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
    }

    getFriends(page = 1, callback, options){
      FRIENDS_FETCH(this.props.user.id, 'all', 0, 100, null)
        .then((responseJSON) => {
          callback(responseJSON, {
              allLoaded: true,
          })
        })
    }

    getIncoming(page = 1, callback, options){
      FRIENDS_FETCH(this.props.user.id, 'incoming', 0, 100, null)
        .then((responseJSON) => {
          callback(responseJSON, {
              allLoaded: true,
          })
        })
    }

    getOutgoing(page = 1, callback, options){
      FRIENDS_FETCH(this.props.user.id, 'outgoing', 0, 100, null)
        .then((responseJSON) => {
          callback(responseJSON, {
              allLoaded: true,
          })
        })
    }

    viewProfile(rowData){
      this.props.navigator.push({
          screen: 'smf_frontend.Profile',
          title: rowData.name + '\'s Profile',
          passProps: { user: rowData, myUser: this.props.user }
      });
    }

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />;

    _renderScene = SceneMap({
      '1': this.Friends,
      '2': this.Incoming,
      '3': this.Outgoing,
    });

    render(){
        return(
          <TabViewAnimated
            style={layout.container}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderHeader={this._renderHeader}
            onIndexChange={this._handleIndexChange}
          />
        )
    }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
  },

  indicator: {
    backgroundColor: PrimaryColor,
  },

  label: {
    color: PrimaryColor,
  }
});

const layout = StyleSheet.create({

});

export default Friends;
