import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PopulatableListView from 'components/PopulatableListView';
import { iconsMap } from 'helpers/icons-loader';
import { BaseStyles, PrimaryColor, NavNoElevation, user } from 'helpers/constants.js';
import ProfileInfo from './ProfileInfo';
import { FEEDS_POST_FETCH, TOPICS_GET_SINGLE, GROUP_USERS_POST_CHECK_REQUEST } from 'helpers/apicalls';

class Profile extends React.Component {


    static navigatorStyle = NavNoElevation;

    Info = () => <ProfileInfo
        {...this.props}
        user={this.state.user} />;
    Activity = () => <View style={{ flex: 1 }}
    ><PopulatableListView
            type={'feed'}
            onFetch={this.getActivityFeeds}
            onPress={this.navigateToFeed}
            pagination={true} />
    </View>;

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            visible: true,
            routes: [
                { key: '1', title: 'Info' },
                { key: '2', title: 'Activity' },
            ],
            user: this.props.user
        }
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.getActivityFeeds = this.getActivityFeeds.bind(this);
        this.navigateToFeed = this.navigateToFeed.bind(this);
    };

    getActivityFeeds(page, callback, options) {
        FEEDS_POST_FETCH('user', this.props.user.id, page)
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
                if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                    this.props.navigator.toggleDrawer({
                        side: 'left',
                        animated: true
                    })
                }

                if (event.id == 'edit') {
                    this.props.navigator.push({
                        screen: 'smf_frontend.EditProfile',
                        title: 'Edit Your Profile'
                    });
                }
                break;

                case 'DeepLink':
                    if (this.state.visible) {
                        const parts = event.link.split('/'); // Link parts
                        const payload = event.payload; // (optional) The payload
                        if (parts[0] == 'nav') {
                            this.props.navigator.push({
                                screen: parts[1],
                                title: payload
                            });
                        }
                    }
                    break;
            }
    
            switch (event.id) {
                case 'willAppear':
                    this.setState({
                        visible: true
                    });
                    break;
                case 'willDisappear':
                    this.setState({
                        visible: false
                    });
                    break;
                case 'bottomTabReselected':
                    this.props.navigator.popToRoot({
                        animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                    });
                    break;
            }
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
                style={{ flex: this.state.visible ? 1 : 0 }}
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
