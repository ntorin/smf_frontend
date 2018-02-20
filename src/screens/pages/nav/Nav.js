import React from 'react';
import { StyleSheet, View, Text, ListView, Dimensions, Alert } from 'react-native';
import Button from 'apsl-react-native-button';
import NavItem from 'components/NavItem';
import LiteProfile from 'components/LiteProfile';
import { BaseStyles, logoutUser, user } from 'helpers/constants.js';

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
                name: 'Activities',
                icon: require('assets/icons/activities.png'),
                screen: 'smf_frontend.Activities'
            },
            {
                name: 'Notifications',
                icon: require('assets/icons/notifications.png'),
                screen: 'smf_frontend.Notifications'
            },
            {
                name: 'Credit History',
                icon: require('assets/icons/credit_history.png'),
                screen: 'smf_frontend.CreditHistory'
            },
            {
                name: 'Friends',
                icon: require('assets/icons/friends.png'),
                screen: 'smf_frontend.Friends'
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
                screen: 'logout'
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
        if (rowData.screen === 'logout') {
            Alert.alert('Logging Out',
                'Are you sure you wish to log out?',
                [{
                    text: 'YES', onPress: () => {
                        logoutUser();
                    }
                }, {text: 'NO'}])
        } else {
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
    }

    render() {
        return (
            <View style={[BaseStyles.container, layout.container]}>
                <LiteProfile user={user} />
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
        width: Dimensions.get('window').width * 0.8
    },

    listView: {
        top: 15
    },
});

export default Nav;
