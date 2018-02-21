import React from 'react';
import { StyleSheet, View, Text, Image, Linking, Alert } from 'react-native';
import Button from 'react-native-button';
import { BaseStyles, PrimaryColor, ScreenBackgroundColor, ANDROID_ADMOB_AD_UNIT_ID } from 'helpers/constants.js';
import Avatar from 'components/Avatar';
import { MarkdownView } from 'react-native-markdown-view';
import { AdMobBanner, AdMobRewarded, PublisherBanner } from 'react-native-admob';
import Moment from 'moment';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

var count = 0;

class ListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    renderTags(tags) {
        var tagsArray = [''];
        if (tags) {
            tagsArray = tags.split(",");
        }

        return (
            <View style={[layout.flexStart, layout.row, layout.tags, layout.wrap]}>
                {tagsArray.map(function (name, index) {
                    return <View style={layout.row} key={index}><View style={styles.tag}><Text style={styles.tagText}>{name}</Text></View><Text>{" "}</Text></View>
                })}
            </View>
        )
    }

    renderPreview(preview) {
        return preview && preview.length >= 50 ? <Text style={styles.dimmedFont}>{preview}...</Text> : <Text style={styles.dimmedFont}>{preview}</Text>;
    }

    renderTopic(rd, user) {

        return (
            <View style={styles.container}>
                <View style={layout.row}>
                    <Text style={styles.bigFont}>{rd.title}</Text>
                    {rd.is_pinned && <OcticonsIcon style={[layout.flexEnd, styles.smallFont, styles.alignRight]} name={"pin"} color={PrimaryColor} />}
                    {rd.is_locked && <FoundationIcon style={[layout.flexEnd, styles.smallFont, styles.alignRight]} name={"lock"} color={PrimaryColor} />}
                </View>
                <View style={layout.row}>
                    <Text style={[layout.name, styles.smallFont, styles.alignLeft]}>by {user.name}</Text>
                    <Text style={[layout.flexEnd, styles.smallFont, styles.alignRight]}>{rd.post_count} posts • {Moment(rd.last_post_date).fromNow()}</Text>
                </View>
                {this.renderPreview(rd.preview)}
                <View style={layout.row}>
                    {this.renderTags(rd.tags)}
                </View>
                <View style={[layout.row, layout.flexEnd, layout.stats]}>
                    <FeatherIcon name={"file-text"} color={PrimaryColor} />
                    <Text style={[styles.smallFont, layout.flexEnd]}>{rd.post_count}</Text>
                </View>
            </View>
        )
    }

    renderGroup(rd) {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.bigFont}>{rd.name}</Text>
                    <View style={layout.row}>
                        <Text style={[styles.smallFont, layout.flexStart, styles.alignLeft]}>{rd.identifier}</Text>
                        <Text style={[styles.smallFont, layout.flexEnd, styles.alignRight]}>last activity {Moment(rd.updated_at).fromNow()}</Text>
                    </View>
                    <Text style={styles.dimmedFont}>{rd.description}</Text>
                    <View style={layout.row}>
                        {this.renderTags(rd.tags)}
                    </View>
                    <View style={[layout.row, layout.flexEnd, layout.stats]}>
                        <MaterialIconsIcon name={"people"} color={PrimaryColor} />
                        <Text style={[styles.smallFont, layout.flexEnd]}>{rd.member_count}</Text>
                        <MaterialIconsIcon name={"chat-bubble"} color={PrimaryColor} />
                        <Text style={[styles.smallFont, layout.flexEnd]}>{rd.topic_count}</Text>
                        <FeatherIcon name={"file-text"} color={PrimaryColor} />
                        <Text style={[styles.smallFont, layout.flexEnd]}>{rd.post_count}</Text>
                    </View>
                </View>
            </View>
        );
    }

    renderPost(rd, user) {
        return (
            <View style={styles.container}>
                <View>
                    <View style={layout.row}>
                        <Button onPress={() => this.props.onPress(this.props.rowData)} onLongPress={() => this.props.onLongPress(this.props.rowData)}>
                            <Text style={styles.bold}>{user.name}</Text>
                        </Button>
                        <Text style={[layout.flexEnd, styles.alignRight]}>{Moment(rd.created_at).fromNow()}</Text>
                    </View>
                    <View style={layout.row}>
                        <Text style={styles.smallFont}>{user.identifier}</Text>
                        <Text style={[layout.flexEnd, styles.alignRight, styles.smallFont]}>{rd.id}</Text>
                    </View>
                </View>
                <MarkdownView onLinkPress={(url) => this.handleURL(url)}>{rd.content}</MarkdownView>
            </View>
        )
    }

    handleURL(url) {
        Alert.alert('Opening Link', 'Are you sure you want to go to ' + url + '?', [{
            text: 'YES', onPress: () => {
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                    } else {
                        return Linking.openURL(url);
                    }
                });
            }
        }, { text: 'NO' }])
    }

    renderNotification(rd) {
        return (
            <View style={styles.container} >
                <Text style={[layout.flexEnd, styles.alignRight]}>{Moment(rd.created_at).fromNow()}</Text>
                <Text style={[styles.medFont]}>{rd.description}</Text>
            </View>
        );
    }


    renderUser(rd) {
        var data = rd;
        if (rd.friend) {
            data = this.props.rowData.friend;
            rd = this.props.rowData.friend;
        } else if (rd.user) {
            data = rd;
            rd = this.props.rowData.user;
        }

        return (
            <View style={styles.container} >
                <View style={layout.row}>
                    <View style={layout.columnEnd}>
                        <View style={layout.row}>
                            <Text style={styles.bigFont}>{rd.name}</Text>
                            {data.role !== undefined && <Text style={[styles.smallFont, layout.flexEnd, styles.alignRight]}>{data.role}</Text>}
                        </View>
                        <Text style={styles.smallFont}>{rd.identifier}</Text>
                        <Text style={styles.dimmedFont}>{rd.blurb}</Text>
                        <View style={layout.row}>
                            <FeatherIcon name={"file-text"} color={PrimaryColor} />
                            <Text style={[styles.smallFont, layout.flexEnd]}>{rd.post_count}</Text>
                            <MaterialIconsIcon name={"chat-bubble"} color={PrimaryColor} size={15} />
                            <Text style={[styles.smallFont, layout.flexEnd]}>{rd.topic_count}</Text>
                            <MaterialIconsIcon name={"group-add"} color={PrimaryColor} size={15} />
                            <Text style={[styles.smallFont, layout.flexEnd]}>{rd.follower_count}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    renderConversation(rd) {

        return (
            <View style={styles.container} >
                <View>
                    <Text style={styles.bigFont}>{rd.conversation.name}</Text>
                    {rd.is_muted && <OcticonsIcon style={[styles.smallFont, layout.flexEnd, styles.alignRight]} name={"mute"} color={PrimaryColor} />}
                </View>
                <View style={layout.row}>
                    <Text style={[styles.smallFont, layout.flexEnd, styles.alignRight]}>last activity {Moment(rd.conversation.updated_at).fromNow()}</Text>
                </View>
                {this.renderPreview(rd.conversation.last_message)}
            </View>
        )
    }

    renderFeed(rd) {
        var view;
        if (rd.feed_type) {
            switch (rd.feed_type.split('-')[0]) {
                case 'topic':
                    view = (
                        <View style={styles.container}>
                            <Text style={[styles.medFont]}>{"New Topic"}</Text>
                            {this.renderTopic(rd.feed, rd.user)}
                        </View>
                    )
                    break;
                case 'group':
                    view = (
                        <View style={styles.container}>
                            <Text style={[styles.medFont]}>{rd.user.name + " joined a Group"}</Text>
                            {this.renderGroup(rd.feed)}
                        </View>
                    )
                    break;
                case 'post':
                    view = (
                        <View style={styles.container}>
                            <Text style={[styles.medFont]}>{"New Post"}</Text>
                            {this.renderPost(rd.feed, rd.user)}
                        </View>
                    )
                    break;

            }

            return view;
        }
    }

    renderActivity(rd) {
        return (
            <View style={[styles.container, this.checkCompletion(rd.completed)]} >
                <Text style={styles.bigFont}>{rd.name}</Text>
                <Text style={styles.medFont}>{rd.description}</Text>
                <View style={layout.row}>
                    <MaterialCommunityIconsIcon
                        name={"coins"}
                        color={PrimaryColor}
                        size={20} />
                    <Text>{rd.reward}</Text>
                </View>
                <Text>{rd.progress + "/" + rd.completion}</Text>
                <Text style={styles.smallFont}>{rd.reset_time}</Text>
            </View>
        )
    }

    checkCompletion(completed) {
        if (completed) {
            return {
                backgroundColor: '#ccebd8'
            }
        }
    }

    renderCreditHistory(rd) {
        return (
            <View style={styles.container} >
                <Text style={[layout.flexEnd, styles.alignRight]}>{Moment(rd.created_at).fromNow()}</Text>
                <Text style={[styles.medFont]}>{rd.description}</Text>
                <View style={layout.row}>
                    <MaterialCommunityIconsIcon
                        name={"coins"}
                        color={PrimaryColor}
                        size={20} />
                    <Text>{rd.credit_transaction}</Text>
                </View>
            </View>
        );
    }

    renderItem(type) {
        var toRender;

        switch (type) {
            case 'topic':
                toRender = this.renderTopic(this.props.rowData, this.props.rowData.user);
                break;
            case 'group':
                toRender = this.renderGroup(this.props.rowData);
                break;
            case 'post':
                toRender = this.renderPost(this.props.rowData, this.props.rowData.user);
                break;
            case 'notification':
                toRender = this.renderNotification(this.props.rowData);
                break;
            case 'user':
                if (this.props.rowData.following_id) {
                    toRender = this.renderUser(this.props.rowData.following);
                } else {
                    toRender = this.renderUser(this.props.rowData);
                }
                break;
            case 'conversation':
                toRender = this.renderConversation(this.props.rowData);
                break;
            case 'feed':
                toRender = this.renderFeed(this.props.rowData);
                break;
            case 'activity':
                toRender = this.renderActivity(this.props.rowData);
                break;
            case 'credit_history':
                toRender = this.renderCreditHistory(this.props.rowData);
            default:
                break;
        }

        return toRender;
    }

    shouldRenderAd() {
        if (count % 10 == 0) {
            return (
                <View>
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID={ANDROID_ADMOB_AD_UNIT_ID}
                        onAdFailedToLoad={error => console.error(error)}
                    />
                </View>
            )
        }
    }

    renderListItem() {
        if (this.props.type == 'post') {
            return (this.renderPost(this.props.rowData, this.props.rowData.user))
        } else {
            return (
                <Button onPress={() => this.props.onPress(this.props.rowData)} onLongPress={() => this.props.onLongPress(this.props.rowData)}>
                    {this.renderItem(this.props.type)}
                </Button>
            )
        }
    }

    render() {
        count++;
        return (
            <View>
                {this.shouldRenderAd()}
                {this.renderListItem()}
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
    },

    smallFont: {
        fontSize: 12,
    },

    medFont: {
        fontSize: 16
    },

    bigFont: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    bold: {
        fontWeight: 'bold'
    },

    alignLeft: {
        textAlign: 'left',
    },

    alignRight: {
        textAlign: 'right',
    },

    dimmedFont: {
        color: '#8e8e8e',
        paddingBottom: 2
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

    wrap: {
        flexWrap: 'wrap'
    },

    tags: {
        flex: 1
    },

    stats: {
        flex: 1
    },

    namePostsDate: {
        flexDirection: 'row'
    },

    name: {
        flex: 1,
    },

    flexEnd: {
        flex: 1,
        alignContent: 'flex-end',
        alignItems: 'flex-end',
    },

    flexStart: {
        flex: 1,
        alignItems: 'flex-start',
    },

    lastActivity: {
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
