import React from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';
import Button from 'apsl-react-native-button';
import NavItem from 'components/NavItem';
import LiteProfile from 'components/LiteProfile';

class Nav extends React.Component {

    constructor(props) {
        super(props);
        const items = [
            {
                name: 'User Directory',
                icon: require('assets/icons/directory.png'),
                screen: 'smf_frontend.UserDirectory'
            },
            {
                name: 'Notifications',
                icon: require('assets/icons/notifications.png'),
                screen: 'smf_frontend.Notifications'
            },
            {
                name: 'Friends',
                icon: require('assets/icons/friends.png'),
                screen: 'smf_frontend.Friends'
            },
            {
                name: 'Settings',
                icon: require('assets/icons/settings.png'),
                screen: 'smf_frontend.Settings'
            },
            {
                name: 'Help',
                icon: require('assets/icons/help.png'),
                screen: 'smf_frontend.Help'
            },
            {
                name: 'About',
                icon: require('assets/icons/about.png'),
                screen: 'smf_frontend.About'
            },
            {
                name: 'Log Out',
                icon: require('assets/icons/logout.png'),
                screen: 'smf_frontend.Login'
            },
        ];
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            menu: ds.cloneWithRows(items),
        };

        this.goToPage = this.goToPage.bind(this);
    }



    renderRow(rowData) {
        return (
            <NavItem rowData={rowData} onPress={this.goToPage} icon={rowData.icon} text={rowData.name} />
        )
    }

    goToPage(rowData) {
        this.props.navigator.handleDeepLink({
            link: 'nav/' + rowData.screen,
            payload: rowData.name
        });

        this.props.navigator.toggleDrawer({
          side: 'left',
          animated: true,
          to: 'closed'
        })
    }

    render() {
        return (
            <View style={layout.container}>
                <LiteProfile user={this.props.user} />
                <ListView
                    style={layout.listView}
                    dataSource={this.state.menu}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        )
    }
}

const layout = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#EDEDEE',
    },

    listView: {
        top: 15
    },
});

export default Nav;
