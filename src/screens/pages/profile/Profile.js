import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import {BaseStyles, PrimaryColor} from 'helpers/styles.js';
import ProfileInfo from './ProfileInfo';

class Profile extends React.Component {

    Info = () => <ProfileInfo />;
    Activity = () => <PopulatableListView />;

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: '1', title: 'Info' },
                { key: '2', title: 'Activity' },
            ],
        }
    };

    _handleIndexChange = index => this.setState({ index });

    _renderHeader = props => <TabBar style={styles.tabBar} {...props} />;

    _renderScene = SceneMap({
        '1': this.Info,
        '2': this.Activity,
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
        )
    }
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: PrimaryColor,
    }
});

const layout = StyleSheet.create({

});

export default Profile;