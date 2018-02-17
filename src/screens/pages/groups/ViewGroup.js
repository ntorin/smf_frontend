import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import Button from 'components/Button';
import PopulatableListView from 'components/PopulatableListView';
import GroupInfo from './GroupInfo';
import { BaseStyles, PrimaryColor, NavNoElevation } from 'helpers/constants';
import { GROUP_USERS_POST, FEEDS_POST_FETCH, GROUP_USERS_POST_FETCH, GROUP_USERS_POST_CHECK_REQUEST } from 'helpers/apicalls';
import Modal from 'components/Modal';
import ModalOptions from 'components/ModalOptions';

class ViewGroup extends React.Component {

  static navigatorStyle = NavNoElevation;

  Overview = () => <GroupInfo
    {...this.props} />;
  Activity = () => <PopulatableListView
    type={'feed'}
    onFetch={this.getActivityFeeds}
    pagination={true} />;
  Members = () => <PopulatableListView
    onFetch={this.getMembers}
    type={'user'}
    forceUpdate={true}
    onPress={this.onMemberPress}
    onLongPress={() => { }}
  />;

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      index: 0,
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

    this.checkGroup();
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  checkGroup() {
    GROUP_USERS_POST_CHECK_REQUEST(this.props.group.id)
      .then((responseJSON) => {
        console.log(responseJSON);
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
    console.log(this.state.groupUser)

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
  },

  bigFont: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});

const layout = StyleSheet.create({

});

export default ViewGroup;
