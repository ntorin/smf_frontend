import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import { PrimaryColor, NavNoElevation } from 'helpers/constants';
import { FEEDS_POST_FETCH } from 'helpers/apicalls';


class Feed extends React.Component {

  static navigatorStyle = NavNoElevation;
  isVisible = this.props.navigator.screenIsCurrentlyVisible();

  All = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getAllFeeds}
    pagination={true} />;
  Follows = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getFollowFeeds}
    pagination={true} />;
  Friends = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getFriendFeeds}
    pagination={true} />;
  BBS = () => <PopulatableListView
    type={'feed'}
    pagination={true} />;

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'All' },
        { key: '2', title: 'Follow' },
        { key: '3', title: 'Friends' },
        { key: '4', title: 'BBS' },
      ],
    };

    this.getAllFeeds = this.getAllFeeds.bind(this);
    this.getFollowFeeds = this.getFollowFeeds.bind(this);
    this.getFriendFeeds = this.getFriendFeeds.bind(this);
    this.getGroupFeeds = this.getGroupFeeds.bind(this);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  getAllFeeds(page, callback, options) {
    FEEDS_POST_FETCH(this.props.user.id, 'all', null, page)
      .then((responseJSON) => {
        callback(responseJSON, {
          allLoaded: true,
        })
      })
  }

  getFollowFeeds(page, callback, options) {
    FEEDS_POST_FETCH(this.props.user.id, 'follows', null, page)
      .then((responseJSON) => {
        callback(responseJSON, {
          allLoaded: true,
        })
      })
  }

  getFriendFeeds(page, callback, options) {
    FEEDS_POST_FETCH(this.props.user.id, 'friends', null, page)
      .then((responseJSON) => {
        callback(responseJSON, {
          allLoaded: true,
        })
      })
  }

  getGroupFeeds(page, callback, options) {
    FEEDS_POST_FETCH(this.props.user.id, 'groups', null, page)
      .then((responseJSON) => {
        callback(responseJSON, {
          allLoaded: true,
        })
      })
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    switch (event.type) {
      case 'NavBarButtonPress':
        if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
          this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
          })
        }
        break;

      case 'DeepLink':
        if (this.isVisible) {
          const parts = event.link.split('/'); // Link parts
          const payload = event.payload; // (optional) The payload
          if (parts[0] == 'nav') {
            this.props.navigator.push({
              screen: parts[1],
              title: payload,
              passProps: { user: this.props.user }
            });
            // handle the link somehow, usually run a this.props.navigator command
          }
        }
        break;
    }

    switch (event.id) {
      case 'didAppear':
        console.log('appeared');
        this.isVisible = this.props.navigator.screenIsCurrentlyVisible();
        break;
      case 'didDisappear':
        console.log('disappeared');
        this.isVisible = this.props.navigator.screenIsCurrentlyVisible();
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
    '1': this.All,
    '2': this.Follows,
    '3': this.Friends,
    '4': this.BBS,
  });

  render() {
    return (
      <TabViewAnimated
        style={layout.container}
        navigationState={this.state}
        renderScene={this._renderScene}
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
