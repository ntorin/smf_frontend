import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BaseStyles, PrimaryColor } from 'helpers/constants.js';
import Avatar from 'components/Avatar';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';


class LiteProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={layout.container}>
                <View style={layout.userDetails}>
                    <View style={layout.row}>
                        <Text style={[{ flex: 1 }, styles.username]}>{this.props.user.name}</Text>
                        <View style={[{ flex: 1, }, layout.row, layout.flexEnd, styles.alignRight]}>
                            <MaterialCommunityIconsIcon
                                name={"coins"}
                                color={PrimaryColor}
                                size={25} />
                            <Text style={styles.mediumFont}>{this.props.user.credits}</Text>
                        </View>
                    </View>
                    <Text style={styles.accountid}>{this.props.user.identifier}</Text>
                    <Text style={styles.description}>{this.props.user.blurb}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        flexWrap: 'wrap',
    },

    accountid: {
        fontSize: 18,
        flexWrap: 'wrap',
    },

    description: {
        fontSize: 12,
        flexWrap: 'wrap',
        fontStyle: 'italic',
        textAlignVertical: 'top'
    },

    alignRight: {
        textAlign: 'right',
    },

    mediumFont: {
        fontSize: 20,
    },
});

const layout = StyleSheet.create({
    container: {
    },

    flexEnd: {
        flex: 1,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
    },

    row: {
        flexDirection: 'row'
    },

    userDetails: {
    },

    userids: {
        left: 5,
        flex: 1,
        paddingRight: 8
    },
});

export default LiteProfile;
