import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'react-native-button';
import BaseStyles, { PrimaryColor, ScreenBackgroundColor } from 'helpers/styles.js';
import Avatar from 'components/Avatar';
import { MarkdownView } from 'react-native-markdown-view';
import Moment from 'moment';

class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTags(tags){
      var tagsArray = tags.split(",");

      return(
        <View style={layout.row}>
          {tagsArray.map(function(name, index){
            return <View style={layout.row}><View style={styles.tag}><Text style={styles.tagText}>{name}</Text></View><Text>{" "}</Text></View>
          })}
        </View>
      )
    }

    renderTopic() {
        rd = this.props.rowData;
        console.log(this.props.rowData);

        return (
            <View style={styles.container}>
                    <Text style={styles.title}>{rd.title}</Text>
                    <View style={layout.row}>
                        <Text style={[layout.name, styles.name]}>by {rd.name}</Text>
                        <Text style={[layout.postsDate, styles.postsDate]}>{rd.post_count} posts • {Moment(rd.last_post_date).fromNow()}</Text>
                    </View>
                    <Text style={styles.preview}>{rd.post_preview}</Text>
                    {this.renderTags(rd.tags)}
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
      padding: 5,
      backgroundColor: ScreenBackgroundColor
    },
    containerBlue: {
        borderRadius: 8,
        backgroundColor: PrimaryColor
    },
    containerOP: {
        borderRadius: 8,
        backgroundColor: PrimaryColor
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    name: {
      fontSize: 12,
      textAlign: 'left',
    },

    postsDate: {
      fontSize: 12,
      textAlign: 'right',
    },

    preview: {
      color: '#8e8e8e'
    },

    tag: {
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 8,
        backgroundColor: PrimaryColor
    },

    tagText: {
      color: '#FFFFFF'
    }
});

const layout = StyleSheet.create({
    row: {
      flexDirection: 'row',
    },

    namePostsDate: {
      flexDirection: 'row'
    },

    name: {
        flex: 1,
    },

    postsDate: {
        flex: 1,
        alignContent: 'flex-end',
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
