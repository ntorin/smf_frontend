import React from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';
import NavItem from 'components/NavItem';
import { BaseStyles, user } from 'helpers/constants.js';

const topic = [
    /* {
        name: 'Edit',
        icon: require('assets/icons/directory.png'),
        link: 'screen/smf_frontend.EditTopic'
    }, */
    {
        name: 'Pin',
        icon: require('assets/icons/directory.png'),
        link: 'function/pin'
    },
    {
        name: 'Lock',
        icon: require('assets/icons/directory.png'),
        link: 'function/lock'
    },
    {
        name: 'Delete',
        icon: require('assets/icons/directory.png'),
        link: 'function/delete'
    },
    {
        name: 'Report',
        icon: require('assets/icons/directory.png'),
        link: 'screen/smf_frontend.CreateReport'
    },
];

const post = [
    /* {
        name: 'Edit',
        icon: require('assets/icons/directory.png'),
        link: 'smf_frontend.EditPost'
    }, */
    {
        name: 'Delete',
        icon: require('assets/icons/directory.png'),
        link: 'function/delete'
    },
    {
        name: 'Report',
        icon: require('assets/icons/directory.png'),
        link: 'screen/smf_frontend.CreateReport'
    },
];

const group_user = [
    {
        name: 'Edit',
        icon: require('assets/icons/directory.png'),
        link: 'screen/smf_frontend.EditGroupUser'
    },
    {
        name: 'Report',
        icon: require('assets/icons/directory.png'),
        link: 'screen/smf_frontend.CreateReport'
    },
];

const usr = [
    {
        name: 'Report',
        icon: require('assets/icons/directory.png'),
        link: 'screen/smf_frontend.CreateReport'
    },
];

const conversation = [
    {
        name: 'Mute',
        icon: require('assets/icons/directory.png'),
        link: 'function/mute'
    },
]

class ModalOptions extends React.Component {

    constructor(props) {
        super(props);
        var items = [];
        switch (this.props.type) {
            case 'topic':
                items = topic;
                break;
            case 'post':
                items = post;
                break;
            case 'group_user':
                items = group_user;
                break;
            case 'conversation':
                items = conversation;
                break;
            case 'usr':
                items = usr;
                break;
        }
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            menu: ds.cloneWithRows(items),
        };
    }

    checkValidity() {
        // rowData.name !== 'Edit' || (rowData.name === 'Edit' && this.props.item.user_id == user.id)
        if (true) {
            return true;
        } else {
            return false;
        }
    }

    renderRow(rowData) {
        if (this.checkValidity()) {
            return (
                <NavItem rowData={rowData} onPress={() => this.props.callback(rowData, this.props.selected)} icon={rowData.icon} text={rowData.name} />
            )
        }
    }

    render() {
        return (
            <View>
                <ListView
                    style={layout.listView}
                    dataSource={this.state.menu}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default ModalOptions;