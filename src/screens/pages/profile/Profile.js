import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import { iconsMap } from 'helpers/icons-loader';
import { BaseStyles, PrimaryColor, NavNoElevation } from 'helpers/constants.js';
import ProfileInfo from './ProfileInfo';
import { FEEDS_POST_FETCH } from 'helpers/apicalls';

class Profile extends React.Component {


    static navigatorStyle = NavNoElevation;

    Info = () => <ProfileInfo user={this.props.user} myUser={this.props.myUser} />;
    Activity = () => <PopulatableListView
        type={'feed'}
        onFetch={this.getActivityFeeds}
        pagination={true} />;

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: '1', title: 'Info' },
                { key: '2', title: 'Activity' },
            ],
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.getActivityFeeds = this.getActivityFeeds.bind(this);
    };

    getActivityFeeds(page, callback, options) {
        FEEDS_POST_FETCH(this.props.myUser.id, 'user', this.props.user.id, page)
            .then((responseJSON) => {
                callback(responseJSON, {
                    allLoaded: true,
                })
            })
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses

            if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true
                })
            }

            if (event.id == 'edit') {
                this.props.navigator.push({
                    screen: 'smf_frontend.EditProfile',
                    title: 'Edit Your Profile',
                    passProps: { user: this.props.myUser }
                });
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
        '1': this.Info,
        '2': this.Activity,
    });


    render() {
        return (
            <TabViewAnimated
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

export default Profile;
