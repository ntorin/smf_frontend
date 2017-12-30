import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import { BaseStyles,  PrimaryColor } from 'helpers/constants.js';
import { TOPICS_POST_FETCH } from 'helpers/apicalls.js';

class BBS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            sort_by: 'recent',

            searchLoading: false,
            searchDisabled: false,
            newTopicLoading: false,
            newTopicDisabled: false
        };

        this.createTopic = this.createTopic.bind(this);
        this.viewTopic = this.viewTopic.bind(this);
        this.advancedSearch = this.advancedSearch.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.getTopics = this.getTopics.bind(this);
        this.createTopic = this.createTopic.bind(this);
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
          if(this.isVisible){
          const parts = event.link.split('/'); // Link parts
          const payload = event.payload; // (optional) The payload
          if (parts[0] == 'nav') {
            this.props.navigator.push({
                screen: parts[1],
                title: payload,
                passProps: { user: this.props.user }
            });
            // handle the link somehow, usually run a this.props.navigator command
          }
        }
          break;
      }

      switch(event.id){
        case 'didAppear':
        console.log('appeared');
        this.isVisible = this.props.navigator.screenIsCurrentlyVisible();
        break;
        case 'didDisappear':
        console.log('disappeared');
        this.isVisible = this.props.navigator.screenIsCurrentlyVisible();
        break;
      }
    }

    getTopics(page, callback, options) {
        TOPICS_POST_FETCH(this.props.group.id, this.state.sort_by, this.state.query, page)
            .then((responseJSON) => {
                callback(responseJSON, {
                    allLoaded: true,
                })
            });
    }

    advancedSearch() {
        this.props.navigator.push({
            screen: 'smf_frontend.AdvancedSearch',
            title: 'Search Topics',
            passProps: {}
        });
    }

    createTopic() {
        this.props.navigator.push({
            screen: 'smf_frontend.CreateTopic',
            title: 'Create Topic',
            passProps: {
              group_id: this.props.group.id,
              user: this.props.user
            }
        });
    }

    viewTopic(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.ViewTopic',
            title: rowData.title,
            passProps: {
              topic: rowData,
              user: this.props.user
            }
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <View style={layout.searchPanel}>
                    <TextInput style={layout.searchBar}
                        placeholder={'🔎 Search...'}
                        placeholderTextColor={PrimaryColor}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        onChangeText={(text) => this.setState({ query: text })}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                    <Button style={layout.advancedSearchButton} onPress={this.advancedSearch} isLoading={this.state.searchLoading} isDisabled={this.state.searchDisabled}>
                        Advanced
                    </Button>
                </View>
                <View>
                    <Button style={layout.newTopicButton} onPress={this.createTopic} isLoading={this.state.newTopicLoading} isDisabled={this.state.newTopicDisabled}>
                        New Topic
                    </Button>
                </View>
                <View style={layout.topicList}>
                    <PopulatableListView
                        type={'topic'}
                        onFetch={this.getTopics}
                        onPress={this.viewTopic}
                        pagination={true}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    searchPanel: {
        flexDirection: 'row'
    },
    searchBar: {
        flex: 5
    },

    advancedSearchButton: {
        flex: 5
    },

    newTopicButton: {
    },

    topicList: {
      flex: 1
    },
});

export default BBS;
