import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Keyboard } from 'react-native';
import TextField from 'react-native-md-textinput';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { Fumi } from 'react-native-textinput-effects';
import TagInput from 'react-native-tag-input';
import { MarkdownEditor } from 'react-native-markdown-editor';
import Button from 'components/Button';
import { BaseStyles, PrimaryColor, ScreenBackgroundColor } from 'helpers/constants';
import { POSTS_POST, TOPICS_POST } from 'helpers/apicalls';

class CreateTopic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: [],
            tagText: '',
            content: ' ',
            is_anonymous: false,
            keyboardVisible: false,
            isEditingContent: false,
        }
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        this.createTopic = this.createTopic.bind(this);
        this.labelExtractor = this.labelExtractor.bind(this);
        this.setState({ content: ' ' })
        this.shouldaHide = this.shouldaHide.bind(this);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.setState({ keyboardVisible: true });
    }

    _keyboardDidHide() {
        this.setState({ keyboardVisible: false, isEditingContent: false });
    }

    createTopic() {
        var tags = this.state.tags.join();

        TOPICS_POST(this.props.group_id, this.state.title, 0, tags, null)
            .then((responseJSON) => {
                POSTS_POST(this.props.group_id, responseJSON.id, this.state.content, true, this.state.is_anonymous, null)
                    .then((responseJSON) => {
                        this.props.navigator.pop({
                            animated: true,
                            animationType: 'fade',
                        });
                    })
            });
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

    shouldaHide() {
        //return  ? true : false;
    }

    submissionIsInvalid() {
        return this.state.title.trim() === '' || this.state.content.trim() === '' || this.state.tags.length == 0 ? true : false;
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                { !this.state.isEditingContent && <View>
                    <TextInput
                        placeholder={'Title'}
                        value={this.state.title}
                        highlightColor={PrimaryColor}
                        onChangeText={(text) => this.setState({ title: text })} />
                    <View style={layout.tags}>
                        <Text style={styles.tagHeader}>Tags (tag1, tag2,...)</Text>
                        <TagInput
                            value={this.state.tags}
                            onChange={this.onChangeTags}
                            labelExtractor={this.labelExtractor}
                            text={this.state.tagText}
                            onChangeText={this.onChangeText}
                        />
                    </View>
                </View>}
                <MarkdownEditor
                    onMarkdownChange={(content) => this.setState({ content: content, isEditingContent: true })}
                    showPreview={true}
                />

                { !this.state.keyboardVisible && <Button
                    title={"Create New Topic"}
                    onPress={this.createTopic}
                    disabled={this.submissionIsInvalid()} />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tagHeader: {
        fontSize: 12,
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
        backgroundColor: ScreenBackgroundColor
    },

    tags: {
        flexDirection: 'row',
    },

    input: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 150,
    }
});

export default CreateTopic;
