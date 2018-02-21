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
            case 'bottomTabReselected':
                this.props.navigator.popToRoot({
                    animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                    animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                });
                break;
        }
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
                        this.props.callback();
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

    submissionIsInvalid() {
        return this.state.title.trim() === '' || this.state.content.length > 5000 || this.state.title.length > 50 || this.state.content.trim() === '' || this.state.tags.length == 0 ? true : false;
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                {!this.state.isEditingContent && <View>
                    <TextInput
                        placeholder={'Title (max. 50 characters; required)'}
                        value={this.state.title}
                        highlightColor={PrimaryColor}
                        onChangeText={(text) => this.setState({ title: text })} />
                    <Text style={styles.tagHeader}>Tags separated by commas (tag1, tag2, ...); required</Text>
                    <View style={layout.row}>
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
                />
                <View style={layout.row}>
                    <Text>{this.state.content.length + "/5000 characters"}</Text>
                    {this.state.isEditingContent && <Button
                        title={"Show Title/Tags"}
                        onPress={() => this.setState({ isEditingContent: false })} />}
                </View>

                {!this.state.keyboardVisible && <Button
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

    row: {
        flexDirection: 'row',
    },

    input: {
        paddingTop: 10,
        paddingBottom: 10,
        height: 150,
    }
});

export default CreateTopic;
