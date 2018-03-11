import React from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';
import NavItem from 'components/NavItem';
import { BaseStyles, user } from 'helpers/constants.js';

const scr_report = [
    {
        name: 'Report',
        icon: require('assets/icons/report.png'),
        link: 'screen/smf_frontend.CreateReport'
    },
];

const scr_edit_topic = [
    {
        name: 'Edit',
        icon: require('assets/icons/edit.png'),
        link: 'screen/smf_frontend.EditTopic'
    }
];

const fun_lock = [
    {
        name: 'Lock',
        icon: require('assets/icons/lock.png'),
        link: 'function/lock'
    },
];

const fun_unlock = [
    {
        name: 'Unlock',
        icon: require('assets/icons/unlock.png'),
        link: 'function/unlock'
    },
];

const fun_pin = [
    {
        name: 'Pin',
        icon: require('assets/icons/pin.png'),
        link: 'function/pin'
    },
];

const fun_unpin = [
    {
        name: 'Unpin',
        icon: require('assets/icons/unpin.png'),
        link: 'function/unpin'
    },
];

const fun_delete = [
    {
        name: 'Delete',
        icon: require('assets/icons/delete.png'),
        link: 'function/delete'
    }
];

const scr_edit_post = [
    {
        name: 'Edit',
        icon: require('assets/icons/edit.png'),
        link: 'smf_frontend.EditPost'
    }
];

const scr_edit_group_user = [
    {
        name: 'Edit',
        icon: require('assets/icons/edit.png'),
        link: 'screen/smf_frontend.EditGroupUser'
    },
];

class ModalOptions extends React.Component {

    constructor(props) {
        super(props);
        var items = [];
        switch (this.props.type) {
            case 'topic':
                this.topicOptions(items);
                break;
            case 'post':
                this.postOptions(items);
                break;
            case 'usr':
                this.userOptions(items);
                break;
        }
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            menu: ds.cloneWithRows(items),
        };

        this.topicOptions = this.topicOptions.bind(this);
    }

    topicOptions(items) {
        role = this.props.group_user.role
        if (role === 'moderator' || role === 'admin' || role === 'creator') {
            if (this.props.selected.is_locked) {
                this.addToArray(items, fun_unlock);
            } else {
                this.addToArray(items, fun_lock);
            }

            if (this.props.selected.is_pinned) {
                this.addToArray(items, fun_unpin);
            } else {
                this.addToArray(items, fun_pin);
            }
        }
        if (this.props.selected.user_id == user.id || role === 'moderator' || role === 'admin' || role === 'creator') {
            this.addToArray(items, fun_delete);
        }
        this.addToArray(items, scr_report);
    }

    addToArray(mainArray, secondArray) {
        for (var i = 0; i < secondArray.length; i++) {
            mainArray.push(secondArrai8ty[i]);
        }
    }

    postOptions(items) {
        role = this.props.group_user.role
        if (role === 'moderator' || role === 'admin' || role === 'creator' || this.props.selected.user_id == user.id) {
            this.addToArray(items, fun_delete);
        }
        this.addToArray(items, scr_report);
    }

    userOptions(items) {
        this.addToArray(items, scr_report);
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