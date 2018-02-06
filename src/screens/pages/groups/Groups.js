import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import { BaseStyles, PrimaryColor, user } from 'helpers/constants.js';
import { GROUPS_POST_FETCH } from 'helpers/apicalls.js';
import Modal from 'components/Modal';

class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort_by: 'recent',
            query: '',
            forceUpdate: false,

            newGroupLoading: false,
            newGroupDisabled: false
        }

        this.createGroup = this.createGroup.bind(this);
        this.viewGroup = this.viewGroup.bind(this);
        this.getGroups = this.getGroups.bind(this);
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
          this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
            isVisible = responseJSON
            if (isVisible) {
              const parts = event.link.split('/'); // Link parts
              const payload = event.payload; // (optional) The payload
              if (parts[0] == 'nav') {
                this.props.navigator.push({
                  screen: parts[1],
                  title: payload
                });
                // handle the link somehow, usually run a this.props.navigator command
              }
            }
          });
          break;
      }
  
      switch (event.id) {
        case 'didAppear':
          this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
            isVisible = responseJSON;
            console.log('feed appeared; ' + isVisible);
          });
          break;
        case 'didDisappear':
          this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
            isVisible = responseJSON;
            console.log('feed disappeared; ' + isVisible);
          });
          break;
      }
    }

    getGroups(page, callback, options) {
        GROUPS_POST_FETCH(this.state.sort_by, this.state.query, page)
            .then((responseJSON) => {
                if (responseJSON.length < 1) {
                    callback(responseJSON, {
                        allLoaded: true
                    })
                } else {
                    callback(responseJSON)
                }
                this.setState({ forceUpdate: false })
            });
    }

    createGroup() {
        this.setState({ newGroupLoading: true, newGroupDisabled: true })

        this.props.navigator.push({
            screen: 'smf_frontend.CreateGroup',
            title: 'Create Group'
        });

        var t = this;
        setTimeout(function () {
            t.setState({ newGroupLoading: false, newGroupDisabled: false })
        }, 500)
    }

    viewGroup(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.ViewGroup',
            title: rowData.name,
            passProps: {
                group: rowData
            }
        });
    }

    render() {
        return (
            <View style={layout.container}>
                <View style={layout.searchPanel}>
                    <TextInput style={layout.searchBar}
                        placeholder={'🔎 Search...'}
                        placeholderTextColor={PrimaryColor}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        onChangeText={(text) => this.setState({ query: text })}
                        onSubmitEditing={() => this.setState({ forceUpdate: true })}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                    <Button
                        title={"New Group"}
                        style={styles.newTopicButton}
                        onPress={this.createGroup}
                        loading={this.state.newGroupLoading}
                        disabled={this.state.newGroupDisabled}>
                    </Button>
                </View>
                <View style={layout.groupList}>
                    <PopulatableListView
                        type={'group'}
                        onFetch={this.getGroups}
                        onPress={this.viewGroup}
                        forceUpdate={this.state.forceUpdate}
                    />
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    newTopicButton: {
        flex: 3
    }
});

const layout = StyleSheet.create({
    container: {
        flex: 1
    },

    searchPanel: {
        flexDirection: 'row',
        padding: 15
    },
    searchBar: {
        flex: 7
    },

    groupList: {
        flex: 1

    }
});

export default Groups;
