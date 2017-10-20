import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import {PrimaryColor, BaseStyles} from 'helpers/styles';

class Discovery extends React.Component {

    All = () => <PopulatableListView/>;
    Users = () => <PopulatableListView/>;
    Groups = () => <PopulatableListView/>;

    constructor(props){
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: '1', title: 'All' },
                { key: '2', title: 'Users' },
                { key: '3', title: 'Groups' },
            ],
        };
    }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar style={styles.tabBar} {...props} />;

  _renderScene = SceneMap({
    '1': this.All,
    '2': this.Users,
    '3': this.Groups,
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

export default Discovery;