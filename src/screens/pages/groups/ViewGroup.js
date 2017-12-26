import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import Button from 'components/Button';
import { GROUP_USERS_POST } from 'helpers/apicalls';

class ViewGroup extends React.Component {

    constructor(props){
        super(props);

        this.goToBBS = this.goToBBS.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
    }

    goToBBS(){
        this.props.navigator.push({
            screen: 'smf_frontend.BBS',
            title: this.props.group.name,
            passProps: {
              group: this.props.group,
              user: this.props.user
            }
        });
    }

    joinGroup(){
      GROUP_USERS_POST(this.props.group.id, this.props.user.id)
        .then((responseJSON) => {
          console.log(responseJSON);
        })
    }

    leaveGroup(){

    }

    render(){
        return(
            <View style={BaseStyles.container}>
            <Button onPress={this.joinGroup}>
               {"Join " + this.props.group.name}
            </Button>
            <Button onPress={this.goToBBS}>
              {"View " + this.props.group.name + "\'s BBS"}
            </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default ViewGroup;
