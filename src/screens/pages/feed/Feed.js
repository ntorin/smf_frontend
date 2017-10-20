import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import {PrimaryColor} from 'helpers/styles';


class Feed extends React.Component {

    All = () => <PopulatableListView/>;
    Follows = () => <PopulatableListView/>;
    Friends = () => <PopulatableListView/>;
    BBS = () => <PopulatableListView/>;

    constructor(props){
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: '1', title: 'All' },
                { key: '2', title: 'Follows' },
                { key: '3', title: 'Friends' },
                { key: '4', title: 'BBS' },
            ],
        };
    }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar style={styles.tabBar} {...props} />;

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
        backgroundColor: PrimaryColor,
    }
});

const layout = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Feed;