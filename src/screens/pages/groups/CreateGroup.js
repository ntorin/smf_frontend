import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Picker } from 'react-native';
import TextField from 'react-native-md-textinput';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { Fumi } from 'react-native-textinput-effects';
import TagInput from 'react-native-tag-input';
import { GROUPS_POST, GROUPS_POST_VALIDATE_IDENTIFIER, GROUP_USERS_POST, } from 'helpers/apicalls';

import Button from 'components/Button';
import { BaseStyles, PrimaryColor, ScreenBackgroundColor } from 'helpers/constants.js';

class CreateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            identifier: '',
            group_type: 'public',
            description: '',
            tags: [],
            tagText: '',
        }
        this.createGroup = this.createGroup.bind(this);
        this.labelExtractor = this.labelExtractor.bind(this);
        this.validateIdentifier = this.validateIdentifier.bind(this);
    }

    createGroup() {
        var tags = this.state.tags.join();

        GROUPS_POST(this.state.identifier, this.state.name, this.state.description, this.state.group_type, tags, null)
            .then((responseJSON) => {
                GROUP_USERS_POST(responseJSON.id)
                    .then((responseJSON) => {
                        this.props.navigator.pop({
                            animated: true,
                            animationType: 'fade'
                        });
                    })
            })
    }

    validateIdentifier() {
        GROUPS_POST_VALIDATE_IDENTIFIER(this.state.identifier, null)
            .then((responseJSON) => {
            })
    }

    onChangeTags = (tags) => {
        this.setState({ tags: tags });
    }

    onChangeText = (text) => {
        this.setState({ tagText: text });

        const lastTyped = text.charAt(text.length - 1);
        const parseWhen = [',', '\n'];

        if (parseWhen.indexOf(lastTyped) > -1) {
            this.setState({
                tags: [...this.state.tags, this.state.tagText],
                tagText: "",
            });
        }
    }

    labelExtractor(tag) {
        return tag;
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <View style={layout.identifierRow}>
                    <TextInput
                        style={layout.identifier}
                        placeholder={'Identifier'}
                        placeholderTextColor={PrimaryColor}
                        underlineColorAndroid={PrimaryColor}
                        onChangeText={(text) => this.setState({ name: text })} />
                    <Button title={"Check"}
                        onPress={this.validateIdentifier}
                        style={layout.validateIdentifier} />
                </View>
                <TextInput
                    placeholder={'Name'}
                    placeholderTextColor={PrimaryColor}
                    underlineColorAndroid={PrimaryColor}
                    onChangeText={(text) => this.setState({ name: text })} />
                <View>
                    <ScrollView>
                        <TextInput
                            placeholder={'Description'}
                            placeholderTextColor={PrimaryColor}
                            underlineColorAndroid={PrimaryColor}
                            selectionColor={PrimaryColor}
                            multiline={true}
                            onChangeText={(text) => this.setState({ description: text })}
                            autoCorrect={true} />
                    </ScrollView>
                </View>
                <View style={layout.tags}>
                    <Text style={styles.tagHeader}>Tags:</Text>
                    <TagInput
                        value={this.state.tags}
                        onChange={this.onChangeTags}
                        labelExtractor={this.labelExtractor}
                        text={this.state.tagText}
                        onChangeText={this.onChangeText}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    { /* <Text style={styles.privacyText}>Privacy</Text>
                     <Picker
                        style={{ flex: 3 }}
                        selectedValue={this.state.group_type}
                        onValueChange={(itemValue, itemIndex) => this.setState({ group_type: itemValue })}
                        prompt={'Group Type'}>
                        <Picker.Item label={"Invite Only"} value={"private"} />
                        <Picker.Item label={"Public"} value={"public"} />
                        <Picker.Item label={"Apply Only"} value={"apply"} />
                    </Picker>*/ }
                </View>
                <Button title={"Create New Group"} onPress={this.createGroup} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tagHeader: {
        fontSize: 16,
        color: PrimaryColor,
    }
});

const layout = StyleSheet.create({
    container: {
        flex: 1
    },

    privacyText: {
        flex: 1,
        textAlignVertical: 'bottom'
    },

    descriptionContainer: {
        padding: 25,
        justifyContent: 'center',
        backgroundColor: ScreenBackgroundColor
    },

    tags: {
        flexDirection: 'row'
    },

    identifierRow: {
        flexDirection: 'row'
    },

    identifier: {
        flex: 7
    },

    validateIdentifier: {
        flex: 3
    }
});

export default CreateGroup;
