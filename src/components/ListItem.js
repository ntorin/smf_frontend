import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'react-native-button';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';
import Avatar from 'components/Avatar';
import { MarkdownView } from 'react-native-markdown-view';
import Moment from 'moment';

class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTopic() {
        rd = this.props.rowData;
        console.log(this.props.rowData);

        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={layout.title}>{rd.title}</Text>
                    <View style={layout.row}>
                        <Text>by {rd.name}</Text>
                        <Text style={layout.count}>{rd.post_count} posts</Text>
                    </View>
                    <Text>tags: {rd.tags} </Text>
                    <Text>last activity on {Moment(rd.created_at).format('d MMM')}</Text>
                    <Text>{rd.post_preview}</Text>
                </View>
            </View>
        )
    }

    renderGroup() {
        rd = this.props.rowData;

        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={layout.title}>{rd.name}</Text>
                    <Text>Created On {Moment(rd.created_at).format('d MMM')} </Text>
                    <Text>{rd.description}</Text>
                </View>
            </View>
        );
    }

    renderPost() {
        rd = this.props.rowData;
        console.log(this.props.rowData);
            return (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <View style={layout.row}>
                            <Text style={layout.poster}>NAME GOES HERE {rd.name}</Text>
                            {/*<Avatar image={require('assets/img/a.png')} style={layout.image} height={48} width={48} /> */}
                        </View>
                        <MarkdownView>{rd.content}</MarkdownView>
                    </View>
                </View>
            )
    }

    renderNotification() {
        rd = this.props.rowData;
        console.log(this.props.rowData);

        if (rd.is_seen) {
            return (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={layout.title}>{rd.title}</Text>
                        <Text>{rd.description}</Text>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.containerBlue}>
                    <View style={styles.textContainer}>
                        <Text style={layout.title}>{rd.title}</Text>
                        <Text>{rd.description}</Text>
                    </View>
                </View>
            )
        }
    }

    renderUser() {
        rd = this.props.rowData;
        console.log(this.props.rowData);

        return (
            <View style={styles.containerBlue}>
                <View style={styles.textContainer}>
                    <View style={layout.row}>
                        {<Avatar image={require('assets/img/a.png')} style={layout.imageUser} height={128} width={128} />}
                        <View style={layout.columnEnd}>
                            <Text style={layout.username}>{rd.name}</Text>
                            <Text style={layout.blurb}>{rd.blurb}</Text>
                            <Text style={layout.count}>{rd.post_count} posts</Text>
                            <Text style={layout.count}>{rd.topic_count} topics</Text>
                            <Text style={layout.count}>{rd.follower_count} followers</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderItem(type) {
        var toRender;

        switch (type) {
            case 'topic':
                toRender = this.renderTopic();
                break;
            case 'group':
                toRender = this.renderGroup();
                break;
            case 'post':
                toRender = this.renderPost();
                break;
            case 'notification':
                toRender = this.renderNotification();
                break;
            case 'user':
                toRender = this.renderUser();
                break;
            default:
                break;
        }

        return toRender;
    }

    render() {
        return (
            <View>
                <Button onPress={() => this.props.onPress(this.props.rowData)}>
                    {this.renderItem(this.props.type)}
                </Button>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: '#d3d3d3'
    },
    containerBlue: {
        borderRadius: 8,
        backgroundColor: PrimaryColor
    },
    containerOP: {
        borderRadius: 8,
        backgroundColor: PrimaryColor
    },
    textContainer: {
        padding: 10
    }
});

const layout = StyleSheet.create({
    title: {
        fontSize: 20,
    },
    username: {
        fontSize: 24,
        textAlign: 'right',
        fontWeight: 'bold',
        flex: 1,
    },
    blurb: {
        fontSize: 16,
        textAlign: 'right',
        fontStyle: 'italic',
        flex: 1,
    },
    poster: {
        fontSize: 16,
        textAlignVertical: 'bottom',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
        flex: 1,
    },
    columnEnd: {
        flexDirection: 'column',
        flex: 1,
    },
    name: {
        flex: 1
    },
    image: {
        alignContent: 'flex-end',
        flex: 1
    },
    imageUser: {
        flex: 1
    },
    count: {
        textAlign: 'right',
        flex: 1
    }
});

export default ListItem;
