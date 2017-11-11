import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import { PrimaryColor, NavNoElevation } from 'helpers/styles';




class Feed extends React.Component {

  static navigatorStyle = NavNoElevation;


  All = () => <PopulatableListView />;
  Follows = () => <PopulatableListView />;
  Friends = () => <PopulatableListView />;
  BBS = () => <PopulatableListView />;

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
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
    if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
        
        if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
            this.props.navigator.toggleDrawer({
                side: 'left',
                animated: true
            })
        }
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