import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import Button from 'components/Button';
import BaseStyles from 'helpers/styles.js';

class ViewTopic extends React.Component {

    constructor(props) {
        super(props);

        this.replyTopic = this.replyTopic.bind(this);
    }

    replyTopic() {
        this.props.navigator.push({
            screen: 'smf_frontend.ReplyTopic',
            title: 'Reply to rowData.name',
            passProps: {}
        });
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <PopulatableListView />

                <Button style={layout.newTopicButton} onPress={this.replyTopic}>
                    Reply
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default ViewTopic;