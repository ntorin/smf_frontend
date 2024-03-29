import React from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Picker, Alert, Keyboard } from 'react-native';
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
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        this.createGroup = this.createGroup.bind(this);
        this.labelExtractor = this.labelExtractor.bind(this);
        this.validateIdentifier = this.validateIdentifier.bind(this);

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
                    if (this.state.visible) {
                        const parts = event.link.split('/'); // Link parts
                        const payload = event.payload; // (optional) The payload
                        if (parts[0] == 'nav') {
                            this.props.navigator.push({
                                screen: parts[1],
                                title: payload
                            });
                        }
                    }
                    break;
            }
    
            switch (event.id) {
                case 'willAppear':
                    this.setState({
                        visible: true
                    });
                    break;
                case 'willDisappear':
                    this.setState({
                        visible: false
                    });
                    break;
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
        this.setState({ keyboardVisible: false, isEditingContent: false, });
        if(this.state.isEditingTags){
            //this.setState({tagText: this.state.tagText += ','})
            this.setState({isEditingTags: false})
            this.onChangeText(this.state.tagText);
        }
    }

    createGroup() {
        Alert.alert('Create Group',
            'Are you sure you want to create the group ' + this.state.name + ' (' + this.state.identifier + ')?',
            [{
                text: 'YES', onPress: () => {
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
            }, { text: 'NO' }]);
    }

    validateIdentifier() {
        GROUPS_POST_VALIDATE_IDENTIFIER(this.state.identifier, null)
            .then((responseJSON) => {
                this.setState({ validation_message: responseJSON.message, valid: responseJSON.valid })
            })
    }

    onChangeTags = (tags) => {
        this.setState({ tags: tags });
    }

    onChangeText = (text) => {
        var editing;
        var t = text;
        if(this.state.tagText.length > 0 && !this.state.isEditingTags){
            editing = true;
        }
        this.setState({ tagText: text, isEditingTags: true });

        if(editing){
            t += ',';
        }

        const lastTyped = t.charAt(t.length - 1);
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
        return !this.state.valid || this.state.description.length > 50 || this.state.name.length < 1 || this.state.name.length > 16 || this.state.name.trim() === '' || this.state.tags.length == 0 ? true : false;
    }

    validationMessageColor() {
        if (!this.state.valid) {
            return {
                color: '#FF0000'
            }
        }else{
            return {
                color: '#00FF00'
            }
        }
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <View style={layout.row}>
                <View style={layout.identifier}>
                    <TextInput
                        placeholder={'Identifier (1-16 chars)'}
                        placeholderTextColor={PrimaryColor}
                        underlineColorAndroid={PrimaryColor}
                        onChangeText={(text) => this.setState({ identifier: text, valid: false, validation_message: '' })} />
                        {this.state.identifier.length == 0 && <Text style={styles.important}>a group identifier is required.</Text>}
                        <Text style={this.validationMessageColor()}>{this.state.validation_message}</Text>
                    </View>
                    <Button title={"Validate"}
                        onPress={this.validateIdentifier}
                        style={layout.validateIdentifier} />

                </View>
                <TextInput
                    placeholder={'Name (1-16 chars)'}
                    placeholderTextColor={PrimaryColor}
                    underlineColorAndroid={PrimaryColor}
                    onChangeText={(text) => this.setState({ name: text })} />
                    {this.state.name.length == 0 && <Text style={styles.important}>a group name is required.</Text>}
                <Text style={styles.tagHeader}>{"Tags separated by commas (tag1, tag2, ...); "}</Text>
                {this.state.tags.length == 0 && <Text style={styles.important}>you must have at least 1 tag to create a group.</Text>}
                <View style={layout.tags}>
                    <TagInput
                        value={this.state.tags}
                        onChange={this.onChangeTags}
                        labelExtractor={this.labelExtractor}
                        text={this.state.tagText}
                        onChangeText={this.onChangeText}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder={'Description (max. 50 chars)'}
                        placeholderTextColor={PrimaryColor}
                        underlineColorAndroid={PrimaryColor}
                        selectionColor={PrimaryColor}
                        multiline={true}
                        onChangeText={(text) => this.setState({ description: text })}
                        autoCorrect={true} />
                    <Text style={{ flex: 1 }}>{this.state.description.length + "/50 characters"}</Text>
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
                <Button
                    title={"Create New Group"}
                    onPress={this.createGroup}
                    disabled={this.submissionIsInvalid()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tagHeader: {
        fontSize: 12,
        color: PrimaryColor,
    },

    important: {
        fontSize: 12,
        fontWeight: 'bold',
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

    row: {
        flexDirection: 'row'
    },

    identifier: {
        flex: 9
    },

    validateIdentifier: {
        flex: 1
    }
});

export default CreateGroup;
