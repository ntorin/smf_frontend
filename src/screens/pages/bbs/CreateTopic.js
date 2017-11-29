import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import TextField from 'react-native-md-textinput';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { Fumi } from 'react-native-textinput-effects';
import TagInput from 'react-native-tag-input';
import { MarkdownEditor } from 'react-native-markdown-editor';
import Button from 'components/Button';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';

class CreateTopic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: [],
            tagText: '',
            content: '',
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
                    placeholder={'Title'}
                    highlightColor={PrimaryColor}
                    onChangeText={(text) => this.setState({ title: text })} />
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
                        <MarkdownEditor onMarkdownChange={this.onTextChange} />

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

    contentContainer: {
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#EDEDED'
    },

    tags: {
        flexDirection: 'row'
    },

    input:{
        paddingTop: 10,
        paddingBottom: 10,
        height: 150,
    }
});

export default CreateTopic;