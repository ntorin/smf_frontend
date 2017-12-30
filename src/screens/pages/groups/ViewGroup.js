import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Button from 'components/Button';
import PopulatableListView from 'components/PopulatableListView';
import GroupInfo from './GroupInfo';
import { BaseStyles, PrimaryColor, NavNoElevation } from 'helpers/constants';
import { GROUP_USERS_POST } from 'helpers/apicalls';

class ViewGroup extends React.Component {

  static navigatorStyle = NavNoElevation;

  Overview = () => <GroupInfo
                      {...this.props} />;
  Activity = () => <PopulatableListView />;
  Members = () => <PopulatableListView />;

    constructor(props){
        super(props);
        this.state = {
          index: 0,
          routes: [
            { key: '1', title: 'Overview' },
            { key: '2', title: 'Activity' },
            { key: '3', title: 'Members' },
          ],
        };
    }

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />;

    _renderScene = SceneMap({
      '1': this.Overview,
      '2': this.Activity,
      '3': this.Members,
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

export default ViewGroup;
