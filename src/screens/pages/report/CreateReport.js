import React from 'react';
import { StyleSheet, View, Text, Picker, Alert } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import Button from 'components/Button';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { REPORTS_POST } from 'helpers/apicalls';

class CreateReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.selected.id,
            group_id: 0,
            user: this.props.selected,
            reason: 'spam',
            comment: ''
        }

        if (this.props.group_id) {
            this.setState({ group_id: this.props.group_id });
        }

        this.sendReport = this.sendReport.bind(this);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        switch (event.type) {
            case 'NavBarButtonPress':
                if (event.id == 'menu') { // this is the same id field from the static navigatorButtons definition
                    this.props.navigator.toggleDrawer({
                        side: 'left',
                        animated: true
                    })
                }
                break;

            case 'DeepLink':
                this.props.navigator.screenIsCurrentlyVisible().then((responseJSON) => {
                    isVisible = responseJSON
                    if (isVisible) {
                        const parts = event.link.split('/'); // Link parts
                        const payload = event.payload; // (optional) The payload
                        if (parts[0] == 'nav') {
                            this.props.navigator.push({
                                screen: parts[1],
                                title: payload
                            });
                            // handle the link somehow, usually run a this.props.navigator command
                        }
                    }
                });
                break;
        }

        switch (event.id) {
            case 'bottomTabReselected':
                this.props.navigator.popToRoot({
                    animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                    animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                });
                break;
        }
    }

    sendReport() {
        Alert.alert('Report User', 'Are you sure you want to report ' + this.state.user.name + ' for ' + this.state.reason + '?',
            [
                {
                    text: "YES", onPress: () => {
                        REPORTS_POST(this.state.group_id, this.state.user_id, this.state.reason, this.state.comment)
                            .then((responseJSON) => {
                                Alert.alert('Report Successful', 'You have reported ' + this.state.user.name + '. Thank you for your assistance.');
                                this.props.navigator.pop({
                                    animated: true,
                                    animationType: 'fade',
                                });
                            })
                    }
                },
                { text: "NO" }
            ]);
    }

    render() {
        return (
            <View style={BaseStyles.container}>
                <Text style={styles.bigFont}>{"You are reporting " + this.state.user.name + " (" + this.state.user.identifier + ")."}</Text>
                <Picker
                    selectedValue={this.state.reason}
                    onValueChange={(itemValue, itemIndex) => this.setState({ reason: itemValue })}
                    prompt={'Reason'}>
                    <Picker.Item label={"Spam"} value={"spam"} />
                    <Picker.Item label={"Illegal Content"} value={"illegal_content"} />
                </Picker>
                <FormLabel>Additional Comments</FormLabel>
                <FormInput onChangeText={(text) => this.setState({ comment: text })} />
                <Button
                    title={"Report User"}
                    onPress={this.sendReport} />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    bigFont: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const layout = StyleSheet.create({

});

export default CreateReport;