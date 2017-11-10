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
    }

    getTopics(page = 1, callback, options) {
        topics = [
            {
                title: 'I Love Anime!',
                name: 'pummelo',
                post_preview: 'gee i sure do love anime! gee i sure do love anime! gee i sure do love anime! gee i sure do love anime! and i think there should be a 150 character li',
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
                id: 5203
            },
            {
                title: 'I Love Anime!',
                name: 'pummelo',
                post_preview: 'gee i sure do love anime! gee i sure do love anime! gee i sure do love anime! gee i sure do love anime! and i think there should be a 150 character li',
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
                id: 5203
            },
        ];
        callback(topics, {
            allLoaded: true,
        })
    }

    advancedSearch() {

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
                        type={'topic'}
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