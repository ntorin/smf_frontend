import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import { USERS_POST_FETCH } from 'helpers/apicalls';
import { BaseStyles, PrimaryColor } from 'helpers/constants.js';

class UserDirectory extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          identifier: '',
          name: '',
          sort_by: 'popular',
          query: '',
        }

        this.getUsers = this.getUsers.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
    }

    getUsers(page = 1, callback, options){
      USERS_POST_FETCH(this.state.identifier, this.state.name, this.state.sort_by, page)
        .then((responseJSON) => {
          callback(responseJSON, {
              allLoaded: true,
          })
        })
    }

    viewProfile(rowData){
      this.props.navigator.push({
          screen: 'smf_frontend.Profile',
          title: rowData.name + "\'s Profile",
          passProps: {
            user: rowData,
            myUser: this.props.user
          }
      });
    }

    render(){
        return(
            <View style={BaseStyles.container}>
            <View>
                <TextInput
                    placeholder={'🔎 Search...'}
                    placeholderTextColor={PrimaryColor}
                    selectionColor={PrimaryColor}
                    textAlign='center'
                    onChangeText={(text) => this.setState({ query: text })}
                    autoCorrect={true}
                    autoCapitalize={'none'}
                    returnKeyType={'search'} />
            </View>
            <View>
            <PopulatableListView
                type={'user'}
                onFetch={this.getUsers}
                onPress={this.viewProfile}
                pagination={false}
            />
            </View>
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
