import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Picker } from 'react-native';
import TextField from 'react-native-md-textinput';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { Fumi } from 'react-native-textinput-effects';
import TagInput from 'react-native-tag-input';

import Button from 'components/Button';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';

class CreateGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tags: [],
            tagText: '',
            description: '',
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.labelExtractor = this.labelExtractor.bind(this);
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


    onSubmit() {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade'
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <TextInput
                    placeholder={'Name'}
                    placeholderTextColor={PrimaryColor}
                    underlineColorAndroid={PrimaryColor}
                    onChangeText={(text) => this.setState({ name: text })} />
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
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.privacyText}>Privacy</Text>
                    <Picker
                        style={{flex: 3}}
                        selectedValue={this.state.language}
                        onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}
                        prompt={'Privacy'}>
                        <Picker.Item label="Invite Only" value="private" />
                        <Picker.Item label="Public" value="public" />
                        <Picker.Item label="Apply Only" value="apply" />
                    </Picker>
                </View>
                <Button onPress={this.onSubmit}>
                    Create New Topic
            </Button>
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

    privacyText:{
        flex:1, 
        textAlignVertical:'bottom'
    },

    descriptionContainer: {
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#EDEDED'
    },

    tags: {
        flexDirection: 'row'
    }
});

export default CreateGroup;