import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PopulatableListView from 'components/PopulatableListView';
import { BaseStyles, user } from 'helpers/constants.js';
import Moment from 'moment';

class Activities extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            forceUpdate: false
        }

        this.getActivities = this.getActivities.bind(this);
    }

    getActivities(page, callback, options) {
        activities = [
            {
                name: 'Daily Post',
                description: 'Reply to any topic 1 time.',
                reward: '1000',
                progress: user.daily_post_count,
                completion: 1,
                completed: this.checkCompletion(user.daily_post_count, 1),
                reset_time: 'Activity resets daily at 12:00AM Pacific Time.'
            },
            {
                name: 'Weekly 10 Posts',
                description: 'Reply to any topic 10 times.',
                reward: '10000',
                progress: user.weekly_post_count,
                completion: 10,
                completed: this.checkCompletion(user.weekly_post_count, 10),
                reset_time: 'Activity resets every Sunday at 12:00AM Pacific Time.'
            },
            {
                name: 'Monthly 100 Posts',
                description: 'Reply to any topic 100 times.',
                reward: '100000',
                progress: user.monthly_post_count,
                completion: 100,
                completed: this.checkCompletion(user.monthly_post_count, 100),
                reset_time: 'Activity resets on the 1st of every month at 12:00AM Pacific Time.'
            },
            {
                name: 'Refer Friends',
                description: 'Refer a friend to Citru.me by giving them the e-mail or identifier associated with your account when they sign up.',
                reward: '1000 per post the new user makes (up to 100 posts)',
                progress: user.referral_count,
                completion: 1,
                completed: this.checkCompletion(user.referral_count, 1),
                reset_time: 'Activity can be done repeatedly, and does not reset.'
            },
        ];

        callback(activities, {
            allLoaded: true
        })
    }

    checkCompletion(progress, completion) {
        return progress >= completion ? true : false;
    }



    render() {
        return (
            <View style={styles.container}> 
                <PopulatableListView
                    type={'activity'}
                    onFetch={this.getActivities}
                    pagination={true}
                    forceUpdate={this.state.forceUpdate}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
});

const layout = StyleSheet.create({

});

export default Activities;