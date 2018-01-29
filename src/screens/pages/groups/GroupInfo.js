import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'components/Button';
import PopulatableListView from 'components/PopulatableListView';
import { BaseStyles, PrimaryColor, NavNoElevation } from 'helpers/constants';
import { GROUP_USERS_POST, GROUP_USERS_POST_CHECK_REQUEST, GROUP_USERS_DELETE } from 'helpers/apicalls';

class GroupInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      groupUser: '',
      joinStatus: '',
      joinLoading: true,
      joinDisabled: false,
    }

    this.goToBBS = this.goToBBS.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
    this.checkGroup = this.checkGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);

    this.checkGroup();
  }

  goToBBS() {
    this.props.navigator.push({
      screen: 'smf_frontend.BBS',
      title: this.props.group.name,
      passProps: {
        group: this.props.group,
        user: this.props.user
      }
    });
  }

  checkGroup() {
    GROUP_USERS_POST_CHECK_REQUEST(this.props.user.id, this.props.group.id)
      .then((responseJSON) => {
        this.setState({
          groupUser: responseJSON.group_user,
          joinStatus: responseJSON.status, joinLoading: false
        })
      })
  }

  joinGroup() {
    this.setState({ joinLoading: true })
    GROUP_USERS_POST(this.props.user.id, this.props.group.id)
      .then((responseJSON) => {
        this.checkGroup();
      })
  }

  leaveGroup() {
    this.setState({ joinLoading: true })
    GROUP_USERS_DELETE(this.state.groupUser.id)
      .then((responseJSON) => {
        this.checkGroup();
      })
  }

  renderJoinButton() {
    switch (this.state.joinStatus) {
      case 'creator':
        return (
          <Button 
          disabled 
          title={"Creator of " + this.props.group.name} />
        )
        break;
      case 'joined':
        return (
          <Button 
          title={"Leave " + this.props.group.name}
            onPress={this.leaveGroup}
            loading={this.state.joinLoading}
            disabled={this.state.joinDisabled} />
        )
        break;
      case 'none':
        return (
          <Button 
          title={"Join " + this.props.group.name}
            onPress={this.joinGroup}
            loading={this.state.joinLoading}
            disabled={this.state.joinDisabled} />
        )
        break;
    }
  }

  render() {
    return (
      <View style={BaseStyles.container}>
        {this.renderJoinButton()}
        <Button title={"View " + this.props.group.name + "\'s BBS"} 
        onPress={this.goToBBS}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default GroupInfo;
