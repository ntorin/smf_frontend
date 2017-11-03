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
                name: 'Messages',
                icon: require('assets/icons/messages.png'),
                screen: 'smf_frontend.Messages'
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
            <NavItem rowData={rowData} onPress={this.goToPage} icon={rowData.icon} text={rowData.name}/>
        )
    }

    goToPage(rowData){
        this.props.navigator.push({
            screen: 'smf_frontend.Feed',
            title: 'rowData.name'
        });
    }

    render() {
        return (
            <View style={layout.container}>
                <LiteProfile username={"username"} accountid={"account_id"}/>
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