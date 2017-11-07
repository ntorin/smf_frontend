import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';

class Groups extends React.Component {

    constructor(props) {
        super(props);
        
        this.createGroup = this.createGroup.bind(this);
        this.viewGroup = this.viewGroup.bind(this);
    }

    advancedSearch() {

    }

    createGroup() {
        this.props.navigator.push({
            screen: 'smf_frontend.CreateGroup',
            title: 'Create Group',
            passProps: {}
        });
    }

    viewGroup(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.BBS',
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
                    <Button style={layout.newTopicButton} onPress={this.createGroup}>
                        New Group
                    </Button>
                </View>
                <View style={layout.groupList}>
                    <PopulatableListView />
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

    groupList: {

    }
});

export default Groups;