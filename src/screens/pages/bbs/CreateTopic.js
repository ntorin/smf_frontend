import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import TextField from 'react-native-md-textinput';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import { Fumi } from 'react-native-textinput-effects';
import TagInput from 'react-native-tag-input';
import { MarkdownEditor } from 'react-native-markdown-editor';
import Button from 'components/Button';
import { BaseStyles,  PrimaryColor, ScreenBackgroundColor } from 'helpers/constants';
import { POSTS_POST, TOPICS_POST } from 'helpers/apicalls';

class CreateTopic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: [],
            tagText: '',
            content: '',
            is_anonymous: false,
        }
        this.createTopic = this.createTopic.bind(this);
        this.labelExtractor = this.labelExtractor.bind(this);
    }

    createTopic(){
      var tags = this.state.tags.join();

      TOPICS_POST(this.props.group_id, this.props.user.id, this.state.title, 0, tags, null)
          .then((responseJSON) => {
            POSTS_POST(this.props.group_id, responseJSON.id, this.props.user.id, this.state.content, true, this.state.is_anonymous, null)
              .then((responseJSON) => {
                console.log(responseJSON)
                this.props.navigator.pop({
                  animated: true, // does the pop have transition animation or does it happen immediately (optional)
                  animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the pop have different transition animation (optional)
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
                        <MarkdownEditor onMarkdownChange={(content) => this.setState({content: content})} />

                <Button onPress={this.createTopic}>
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
        backgroundColor: ScreenBackgroundColor
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
