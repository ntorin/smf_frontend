import React from 'react';
import { StyleSheet, View, Text, ListView } from 'react-native';
import Button from 'apsl-react-native-button';


class Nav extends React.Component {

    constructor(props) {
        super(props);
        const items = [
            {
                name: 'User Directory',
                screen: 'storytime_buddies_frontend.UserDirectory'
            },
            {
                name: 'Settings',
                screen: 'storytime_buddies_frontend.Settings'
            },
            {
                name: 'Help',
                screen: 'storytime_buddies_frontend.Help'
            },
            {
                name: 'About',
                screen: 'storytime_buddies_frontend.About'
            },
            {
                name: 'Log Out',
                screen: 'storytime_buddies_frontend.Login'
            },
        ];
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            menu: ds.cloneWithRows(items),
        };

        this.goToPage = this.goToPage.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.menu}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        )
    }

    renderRow(rowData) {
        return (
            <Button style={styles.listItem}>
                <Text>{rowData.name}</Text>
            </Button>
        )
    }

    goToPage(rowData){
        this.props.navigator.push({
            screen: rowData.screen,
            title: rowData.name
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },

    listItem: {
        borderWidth: 0
    },
});

export default Nav;