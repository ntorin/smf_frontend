import React from 'react';
import { View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import { PrimaryColor, NavNoElevation, user } from 'helpers/constants';
import { FEEDS_POST_FETCH, TOPICS_GET_SINGLE, GROUP_USERS_POST_CHECK_REQUEST } from 'helpers/apicalls';


class Feed extends React.Component {
  static navigatorStyle = NavNoElevation;

  All = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getAllFeeds}
    onPress={this.navigateToFeed}
    pagination={true} />;
  Follows = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getFollowFeeds}
    onPress={this.navigateToFeed}
    pagination={true} />;
  Friends = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getFriendFeeds}
    onPress={this.navigateToFeed}
    pagination={true} />;
  BBS = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getGroupFeeds}
    onPress={this.navigateToFeed}
    pagination={true} />;

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      visible: true,
      routes: [
        { key: '1', title: 'BBS' },
        { key: '2', title: 'Follow' },
        { key: '3', title: 'Friend' },
        { key: '4', title: 'All' },
      ],
    };

    this.getAllFeeds = this.getAllFeeds.bind(this);
    this.getFollowFeeds = this.getFollowFeeds.bind(this);
    this.getFriendFeeds = this.getFriendFeeds.bind(this);
    this.getGroupFeeds = this.getGroupFeeds.bind(this);
    this.navigateToFeed = this.navigateToFeed.bind(this);

    AsyncStorage.getItem('smf_frontend.newUser').then((newUser) => {
      console.log('in storage');
      if (!newUser) {
        console.log('in new user');
        this.showIntro();
        AsyncStorage.setItem('smf_frontend.newUser', 'complete');
      }
    });

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  getAllFeeds(page, callback, options) {
    FEEDS_POST_FETCH('all', null, page)
      .then((responseJSON) => {
        console.log(responseJSON);
        if (responseJSON.length < 1) {
          callback(responseJSON, {
            allLoaded: true
          })
        } else {
          callback(responseJSON)
        }
        this.setState({ forceUpdate: false })
      })
  }

  getFollowFeeds(page, callback, options) {
    FEEDS_POST_FETCH('follows', null, page)
      .then((responseJSON) => {
        if (responseJSON.length < 1) {
          callback(responseJSON, {
            allLoaded: true
          })
        } else {
          callback(responseJSON)
        }
        this.setState({ forceUpdate: false })
      })
  }

  getFriendFeeds(page, callback, options) {
    FEEDS_POST_FETCH('friends', null, page)
      .then((responseJSON) => {
        if (responseJSON.length < 1) {
          callback(responseJSON, {
            allLoaded: true
          })
        } else {
          callback(responseJSON)
        }
        this.setState({ forceUpdate: false })
      })
  }

  getGroupFeeds(page, callback, options) {
    FEEDS_POST_FETCH('groups', null, page)
      .then((responseJSON) => {
        if (responseJSON.length < 1) {
          callback(responseJSON, {
            allLoaded: true
          })
        } else {
          callback(responseJSON)
        }
        this.setState({ forceUpdate: false })
      })
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    switch (event.type) {
      case 'NavBarButtonPress':
      console.log('NavBarButtonPress')
        if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
          this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
          })
        }
        break;

      case 'DeepLink':
      console.log('DeepLink: ' + event.link)
        if(this.state.visible){
          const parts = event.link.split('/'); // Link parts
          const payload = event.payload; // (optional) The payload
          if (parts[0] == 'nav') {
            console.log('navigating')
            this.props.navigator.push({
              screen: parts[1],
              title: payload
            });
          }
        }
        
        this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
          isVisible = responseJSON
          if (isVisible) {
            const parts = event.link.split('/'); // Link parts
            const payload = event.payload; // (optional) The payload
            if (parts[0] == 'nav') {
              console.log('navigating')
              this.props.navigator.push({
                screen: parts[1],
                title: payload
              });
              // handle the link somehow, usually run a this.props.navigator command
            }
          }
        });
        break;
    }

    switch (event.id) {
      case 'willAppear':
      console.log('willAppear')
        this.setState({
          visible: true
        });
        break;
      case 'willDisappear':
      console.log('willAppear')
        this.setState({
          visible: false
        });
        break;
      case 'bottomTabReselected':
      console.log('bottomTabReselected')
        this.props.navigator.popToRoot({
          animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
          animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        });
        break;
    }
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar
    {...props}
    style={styles.tabBar}
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
  />;

  _renderScene = SceneMap({
    '1': this.BBS,
    '2': this.Follows,
    '3': this.Friends,
    '4': this.All,
  });

  showIntro(){
    console.log('in intro');
    this.props.navigator.toggleDrawer({
      side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
      animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
    });
    Alert.alert('Welcome!', 'Your account\'s credits are visible in the top-right of the side menu.\n\n' + 
    'Create posts and topics to gain more credits!\n\nView \'Activities\' to see how you can gain credits faster.', [{text: 'OK'}]);
  }

  viewGroup(rowData) {
    this.props.navigator.push({
      screen: 'smf_frontend.ViewGroup',
      title: rowData.feed.name,
      passProps: {
        group: rowData.feed
      }
    });
  }

  viewTopic(rowData) {
    GROUP_USERS_POST_CHECK_REQUEST(rowData.feed.group_id)
      .then((responseJSON) => {
        this.props.navigator.push({
          screen: 'smf_frontend.ViewTopic',
          title: rowData.feed.title,
          passProps: {
            topic: rowData.feed,
            group_user: responseJSON.group_user,
            joinStatus: responseJSON.status,
          }
        });
      });
  }

  viewPost(rowData) {
    GROUP_USERS_POST_CHECK_REQUEST(rowData.feed.group_id)
      .then((responseJSON) => {
        TOPICS_GET_SINGLE(rowData.feed.topic_id)
          .then((responseJSON2) => {
            this.props.navigator.push({
              screen: 'smf_frontend.ViewTopic',
              title: responseJSON2.title,
              passProps: {
                topic: responseJSON2,
                group_user: responseJSON.group_user,
                joinStatus: responseJSON.status,

                jump_to: rowData.feed.id
              }
            });
          })
      });
  }

  navigateToFeed(rowData) {
    switch (rowData.feed_type.split('-')[0]) {
      case 'topic':
        this.viewTopic(rowData);
        break;
      case 'group':
        this.viewGroup(rowData);
        break;
      case 'post':
        this.viewPost(rowData);
        break;

    }
  }

  render() {
    return (
      <TabViewAnimated
        style={[layout.container, { flex: this.state.visible ? 1 : 0 }]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderPager={this._renderPager}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
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
  container: {
    flex: 1,
  },
})

export default Feed;
