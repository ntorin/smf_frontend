import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Button from 'components/Button';
import PopulatableListView from 'components/PopulatableListView';
import GroupInfo from './GroupInfo';
import { BaseStyles, PrimaryColor, NavNoElevation } from 'helpers/constants';
import { GROUP_USERS_POST, FEEDS_POST_FETCH, GROUP_USERS_POST_FETCH, GROUP_USERS_POST_CHECK_REQUEST, TOPICS_GET_SINGLE } from 'helpers/apicalls';
import Modal from 'components/Modal';
import ModalOptions from 'components/ModalOptions';

class ViewGroup extends React.Component {

  static navigatorStyle = NavNoElevation;

  Overview = () => <GroupInfo
    {...this.props} />;
  Activity = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getActivityFeeds}
    onPress={this.navigateToFeed}
    pagination={true} />;
  Members = () => <PopulatableListView
    onFetch={this.getMembers}
    type={'user'}
    forceUpdate={true}
    pagination={true}
    onPress={this.onMemberPress}
    onLongPress={() => { }}
  />;

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      index: 0,
      visible: true,
      routes: [
        { key: '1', title: 'Overview' },
        { key: '2', title: 'Activity' },
        { key: '3', title: 'Members' },
      ],
      selectedMember: {},
      groupUser: {}
    };

    this.getActivityFeeds = this.getActivityFeeds.bind(this);
    this.onModalAction = this.onModalAction.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.onMemberPress = this.onMemberPress.bind(this);
    this.editGroupMember = this.editGroupMember.bind(this);
    this.checkGroup = this.checkGroup.bind(this);
    this.navigateToFeed = this.navigateToFeed.bind(this);

    this.checkGroup();

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
    GROUP_USERS_POST_CHECK_REQUEST(rowData.feed.post.group_id)
      .then((responseJSON) => {
        TOPICS_GET_SINGLE(rowData.feed.post.topic_id)
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

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  checkGroup() {
    GROUP_USERS_POST_CHECK_REQUEST(this.props.group.id)
      .then((responseJSON) => {
        this.setState({
          groupUser: responseJSON.group_user
        })
      })
  }

  getActivityFeeds(page, callback, options) {
    FEEDS_POST_FETCH('group', this.props.group.id, page)
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

  getMembers(page, callback, options) {
    GROUP_USERS_POST_FETCH(this.props.group.id, page)
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

  onMemberPress(rowData) {
    this.setState({ selectedMember: rowData.user });

    switch (this.state.groupUser.role) {
      case 'creator':
        switch (rowData.role) {
          case 'moderator': case 'user': case 'admin':
            this.editAlert(rowData);
            break;
          default: this.viewProfile(rowData);
        }
        break;
      case 'admin':
        switch (rowData.role) {
          case 'moderator': case 'user':
            this.editAlert(rowData);
            break;
          default: this.viewProfile(rowData);
        }
        break;
      default:
        this.viewProfile(rowData);
        break;
    }
  }

  editAlert(rowData) {
    Alert.alert('Member Options', 'What would you like to do to ' + rowData.user.name + '?',
      [
        {
          text: "VIEW PROFILE", onPress: () => {
            this.viewProfile(rowData);
          }
        },
        {
          text: "EDIT", onPress: () => {
            this.editGroupMember(rowData);
          }
        },

        { text: "CANCEL" }])
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

  onModalAction(action, selected) {
    const parts = action.link.split('/');
    switch (parts[0]) {
      case 'screen':
        this.props.navigator.push({
          screen: parts[1],
          title: action.name,
          passProps: { selected: selected }
        });
        break;
    }
    this._hideModal();
  }

  editGroupMember(rowData) {
    this.props.navigator.push({
      screen: 'smf_frontend.EditGroupUser',
      title: 'Edit ' + rowData.user.name,
      passProps: {
        group_user: rowData,
        permissions: this.state.groupUser.role
      }
    });
  }

  viewProfile(rowData) {
    this.props.navigator.push({
      screen: 'smf_frontend.Profile',
      title: rowData.user.name + "\'s Profile",
      passProps: {
        user: rowData.user
      }
    });
  }

  renderModal() {
    return (
      <Modal
        onRequestClose={this._hideModal}
        visible={this.state.isModalVisible}>
        <View style={BaseStyles.container}>
          <Text style={styles.bigFont}>Group Member Options</Text>
          <ModalOptions
            type={'group_user'}
            callback={this.onModalAction}
            selected={this.state.selectedTopic}
          />
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <TabViewAnimated
        style={[layout.container, { flex: this.state.visible ? 1 : 0 }]}
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
  },

  bigFont: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

const layout = StyleSheet.create({

});

export default ViewGroup;
