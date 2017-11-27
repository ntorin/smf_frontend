import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';

class BBS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
        };

        this.createTopic = this.createTopic.bind(this);
        this.viewTopic = this.viewTopic.bind(this);
        this.advancedSearch = this.advancedSearch.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            
            if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                this.props.navigator.toggleDrawer({
                    side: 'left',
                    animated: true
                })
            }
        }
    }

    getTopics(page = 1, callback, options) {
        topics = [
            {
                title: 'I Love Anime!',
                name: 'pummelo',
                post_preview: 'gee i sure do love anime! gee i sure do love anime! gee i sure do love anime! gee i sure do love anime! and i think there should be a 150 character li...',
                post_count: 74,
                topic_tags: [
                    {
                        name: 'anime'
                    },
                    {
                        name: 'weeb'
                    },
                    {
                        name: 'thinking'
                    }
                ],
                id: 5203,
                content: '**memes!** i love memes!'
            },
        ];
        callback(topics, {
            allLoaded: true,
        })
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
            passProps: {}
        });
    }

    viewTopic(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.ViewTopic',
            title: 'rowData.name',
            passProps: {}
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
                        onChangeText={(text) => this.setState({ searchQuery: text })}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                    <Button style={layout.advancedSearchButton} onPress={this.advancedSearch}>
                        Advanced
                    </Button>
                </View>
                <View>
                    <Button style={layout.newTopicButton} onPress={this.createTopic}>
                        New Topic
                    </Button>
                </View>
                <View style={layout.topicList}>
                    <PopulatableListView
                        type={'post'}
                        onFetch={this.getTopics}
                        onPress={this.viewTopic}
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

    },
});

export default BBS;