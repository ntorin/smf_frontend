import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import { USERS_POST_FETCH } from 'helpers/apicalls';
import { BaseStyles, PrimaryColor } from 'helpers/constants.js';
import Modal from 'components/Modal';
import ModalOptions from 'components/ModalOptions';

class UserDirectory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            identifier: '',
            name: '',
            sort_by: 'popular',
            query: '',
            forceUpdate: false,
        }

        this.getUsers = this.getUsers.bind(this);
        this.viewProfile = this.viewProfile.bind(this);
        this.selectUser = this.selectUser.bind(this);
        this.onModalAction = this.onModalAction.bind(this);
        
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

    _showModal = () => this.setState({ isModalVisible: true })

    _hideModal = () => this.setState({ isModalVisible: false })

    onModalAction(action, selected) {
        const parts = action.link.split('/');
        switch (parts[0]) {
            case 'screen':
                this.props.navigator.push({
                    screen: parts[1],
                    title: action.name,
                    passProps: { selected: selected }
                });
                break;
        }
        this._hideModal();
    }

    selectUser(rowData) {
        this.setState({ selectedUser: rowData });
        this._showModal();
    }

    getUsers(page = 1, callback, options) {
        USERS_POST_FETCH(this.state.identifier, this.state.name, this.state.sort_by, page)
            .then((responseJSON) => {
                if (responseJSON.length < 1) {
                    callback(responseJSON, {
                        allLoaded: true
                    })
                } else {
                    callback(responseJSON)
                }
                this.setState({ forceUpdate: false })
            })
    }

    viewProfile(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.Profile',
            title: rowData.name + "\'s Profile",
            passProps: {
                user: rowData
            }
        });
    }

    renderModal() {
        return (
            <Modal
                onRequestClose={this._hideModal}
                visible={this.state.isModalVisible}>
                <View style={BaseStyles.container}>
                    <Text style={styles.bigFont}>User Options</Text>
                    <ModalOptions
                        type={'usr'}
                        callback={this.onModalAction}
                        selected={this.state.selectedUser}
                    />
                </View>
            </Modal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <View>
                    <TextInput
                        placeholder={'🔎 Search...'}
                        placeholderTextColor={PrimaryColor}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        onChangeText={(text) => this.setState({ name: text, identifier: text })}
                        onSubmitEditing={() => this.setState({ forceUpdate: true })}
                        autoCorrect={true}
                        autoCapitalize={'none'}
                        returnKeyType={'search'} />
                </View>
                <View style={{ flex: 1 }}>
                    <PopulatableListView
                        type={'user'}
                        onFetch={this.getUsers}
                        onPress={this.viewProfile}
                        onLongPress={this.selectUser}
                        pagination={true}
                        forceUpdate={this.state.forceUpdate}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    backgroundImage: {
        flex: 1,
        resizeMode: 'cover'
    },

    bigFont: {
        fontSize: 20,
        fontWeight: 'bold',
    }
});

export default UserDirectory;
