import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import { USERS_POST_FETCH } from 'helpers/apicalls';

class UserDirectory extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          identifier: '',
          name: '',
          sort_by: 'popular',
          offset: 0,
          limit: 100
        }

        this.getUsers = this.getUsers.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
    }

    getUsers(page = 1, callback, options){
      USERS_POST_FETCH(this.state.identifier, this.state.name, this.state.sort_by, this.state.offset, this.state.limit, null)
        .then((responseJSON) => {
          callback(responseJSON, {
              allLoaded: true,
          })
        })
    }

    viewProfile(rowData){
      this.props.navigator.push({
          screen: 'smf_frontend.Profile',
          title: 'Search Topics',
          passProps: {
            user: rowData,
            myUser: this.props.user
          }
      });
    }

    render(){
        return(
            <View style={styles.container}>
            <PopulatableListView
                type={'user'}
                onFetch={this.getUsers}
                onPress={this.viewProfile}
                pagination={false}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },
});

export default UserDirectory;
