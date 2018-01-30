import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import { PrimaryColor, NavNoElevation } from 'helpers/constants';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import { FRIENDS_POST_FETCH, FRIENDS_POST, FRIENDS_POST_ACCEPT_REQUEST } from 'helpers/apicalls';

class Friends extends React.Component {

  static navigatorStyle = NavNoElevation;


  Friends = () => <PopulatableListView
                    type={'user'}
                    onFetch={this.getFriends}
                    onPress={this.viewProfile}
                    pagination={true} />;

  Incoming = () => <PopulatableListView
                    type={'user'}
                    onFetch={this.getIncoming}
                    onPress={this.viewProfile}
                    pagination={true} />;

  Outgoing = () => <PopulatableListView
                    type={'user'}
                    onFetch={this.getOutgoing}
                    onPress={this.viewProfile}
                    pagination={true} />;

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

    getFriends(page, callback, options){
      FRIENDS_POST_FETCH('all', page)
        .then((responseJSON) => {
          callback(responseJSON, {
              allLoaded: true,
          })
        })
    }

    getIncoming(page, callback, options){
      FRIENDS_POST_FETCH('incoming', page)
        .then((responseJSON) => {
          callback(responseJSON, {
              allLoaded: true,
          })
        })
    }

    getOutgoing(page, callback, options){
      FRIENDS_POST_FETCH('outgoing', page)
        .then((responseJSON) => {
          callback(responseJSON, {
              allLoaded: true,
          })
        })
    }

    viewProfile(rowData){
      this.props.navigator.push({
          screen: 'smf_frontend.Profile',
          title: rowData.friend.name + '\'s Profile',
          passProps: { user: rowData.friend }
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
