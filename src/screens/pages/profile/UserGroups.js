import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import { GROUPS_POST_MY_GROUPS } from 'helpers/apicalls.js';
import PopulatableListView from 'components/PopulatableListView';

class UserGroups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sort_by: 'recent',
            query: ''
        }

        this.getGroups = this.getGroups.bind(this);
        this.viewGroup = this.viewGroup.bind(this);
        
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

    getGroups(page, callback, options) {
        GROUPS_POST_MY_GROUPS(this.props.user.id, page)
            .then((responseJSON) => {
                if (responseJSON.length < 1) {
                    callback(responseJSON, {
                        allLoaded: true
                    })
                } else {
                    callback(responseJSON)
                }
            });
    }

    viewGroup(rowData) {
        this.props.navigator.push({
            screen: 'smf_frontend.ViewGroup',
            title: rowData.name,
            passProps: {
                group: rowData
            }
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <PopulatableListView
                    type={'group'}
                    onFetch={this.getGroups}
                    onPress={this.viewGroup}
                    pagination={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default UserGroups;