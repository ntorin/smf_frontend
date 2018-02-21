import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { BaseStyles, goToHome, PrimaryColor } from 'helpers/constants';
import Button from 'components/Button';
import { CheckBox, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { USERS_POST_VALIDATE_IDENTIFIER, USERS_PUT_ACCEPT_TOS, USERS_PUT_CREATE_NAME, USERS_PUT_CREATE_IDENTIFIER, GROUP_USERS_POST, REFERRALS_POST, REFERRALS_POST_CHECK_USER } from 'helpers/apicalls';
import { user } from 'helpers/constants';
import TermsOfService from 'components/TermsOfService';

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tos_accepted: false,

            identifier_valid: false,
            identifier_message: '',
            identifier_field: '',
            identifier: '',

            validateDisabled: false,
            validateLoading: false,

            name: '',
            name_valid: false,
            name_errors: '',

            referral_valid: false,
            referral_message: '',
            referrer_field: '',
            referrer: '',

            checkDisabled: false,
            checkLoading: false,

            passed_tos: false,
            passed_identifier: false,
            passed_name: false,
            passed_referral: false
        }

        if (user.accepted_tos != false) {
            this.state.passed_tos = true;
        }

        if (user.identifier != null) {
            this.state.passed_identifier = true;
        }

        this.validateIdentifier = this.validateIdentifier.bind(this);
        this.setIdentifier = this.setIdentifier.bind(this);
        this.setName = this.setName.bind(this);
        this.goToMenu = this.goToMenu.bind(this);
        this.checkUser = this.checkUser.bind(this);
        this.addReferral = this.addReferral.bind(this);
        this.acceptTOS = this.acceptTOS.bind(this);
    }

    goToMenu() {
        this.setState({ passed_name: true })
        if (this.state.passed_identifier) {
            goToHome();
        }
    }

    acceptTOS() {
        USERS_PUT_ACCEPT_TOS()
            .then((responseJSON) => {
                this.setState({ passed_tos: true });
            })
    }

    checkIdentifierRegex(text) {
        this.setState({ identifier_valid: false, identifier_message: '', identifier_field: text });
    }

    validateIdentifier() {
        this.setState({ identifier: this.state.identifier_field, validateDisabled: true, validateLoading: true })
        USERS_POST_VALIDATE_IDENTIFIER(this.state.identifier_field)
            .then((responseJSON) => {
                this.setState({ identifier_message: responseJSON.message, identifier_valid: responseJSON.valid })
                if (!responseJSON.valid) {
                    this.setState({ identifier: '' })
                }
                this.setState({ validateDisabled: false, validateLoading: false })
            })
    }

    setIdentifier() {
        USERS_PUT_CREATE_IDENTIFIER(this.state.identifier)
            .then((responseJSON) => {
                this.setState({ passed_identifier: true })
            })
    }

    validateName(name) {
        if (name.length > 0 && name.length < 17) {
            this.setState({ name_valid: true, name: name })
        } else {
            this.setState({ name_valid: false, name_errors: 'Your name must be 1-16 characters long.' })
        }
    }

    setName() {
        USERS_PUT_CREATE_NAME(this.state.name)
            .then((responseJSON) => {
                this.setState({ passed_name: true });
            })
        GROUP_USERS_POST(1) //joining the global BBS
            .then((responseJSON) => {
            })
    }

    checkUser() {
        this.setState({ referrer: this.state.referrer_field, checkDisabled: true, checkLoading: true })
        REFERRALS_POST_CHECK_USER(this.state.referrer_field)
            .then((responseJSON) => {
                this.setState({ referral_message: responseJSON.message, referral_valid: responseJSON.valid })
                if (!responseJSON.valid) {
                    this.setState({ referrer: '' });
                } else {
                    this.setState({ referrer_id: responseJSON.referrer_id });
                }
                this.setState({ checkDisabled: false, checkLoading: false })
            });
    }

    addReferral() {
        REFERRALS_POST(this.state.referrer_id)
            .then((responseJSON) => {
                this.goToMenu();
            });
    }


    render() {
        return (
            <View style={BaseStyles.container}>
                <View style={layout.subContainer}>
                    {!this.state.passed_tos &&
                        <View >
                            <View >
                                <TermsOfService />
                            </View>
                            <View style={[layout.row]}>
                                <CheckBox
                                    title={"Accept"}
                                    onPress={() => this.setState({ tos_accepted: !this.state.tos_accepted })}
                                    checkedIcon={"check-square-o"}
                                    checkedColor={PrimaryColor}
                                    checked={this.state.tos_accepted} />
                                <Button
                                    title={"Next"}
                                    disabled={!this.state.tos_accepted}
                                    onPress={this.acceptTOS} />
                            </View>
                        </View>
                    }
                    {(this.state.passed_tos && !this.state.passed_identifier) &&
                        <View>
                            <Text>Create Your Identifier</Text>
                            <Text>
                                {"Identifiers let other users find and recognize you more easily.\n\n Your identifier can only contain letters, numbers and underscores, "
                                    + "and must be 1-16 characters long.\n\n Identifiers cannot be changed in the future; "
                                    + "You will be able to create a non-unique, editable account name on the next page."}
                            </Text>
                            <View style={[{ padding: 15 }]}>
                                <View>
                                    <FormLabel>Identifier</FormLabel>
                                    <FormInput onChangeText={(text) => this.checkIdentifierRegex(text)} />
                                    {!this.state.identifier_valid && <FormValidationMessage>{this.state.identifier_message}</FormValidationMessage>}
                                </View>

                                <Button
                                    title={"Validate"}
                                    loading={this.state.validateLoading}
                                    disabled={this.state.validateDisabled}
                                    onPress={this.validateIdentifier} />
                            </View>
                            <View style={layout.row}>
                                <Text>{"Your Identifier: " + this.state.identifier}</Text>
                                <Button
                                    title={"Next"}
                                    disabled={!this.state.identifier_valid}
                                    onPress={this.setIdentifier} />
                            </View>
                        </View>
                    }
                    {(this.state.passed_tos && this.state.passed_identifier && !this.state.passed_name) &&
                        <View>
                            <Text>Pick a Name</Text>
                            <Text>
                                {"Your name is what you want other users to call you.\n\n Your name can contain special characters, "
                                    + "and must be between 1-16 characters.\n\n Names can be altered at any time from your profile."}
                            </Text>
                            <View style={{ padding: 15 }}>
                                <FormLabel>Name</FormLabel>
                                <FormInput onChangeText={(text) => this.validateName(text)} />
                                {!this.state.name_valid && <FormValidationMessage>{this.state.name_errors}</FormValidationMessage>}
                            </View>
                            <View style={layout.row}>
                                <Text>{"Your Name: " + this.state.name}</Text>
                                <Button
                                    title={"Next"}
                                    disabled={!this.state.name_valid}
                                    onPress={this.setName} />
                            </View>
                        </View>
                    }
                    {(this.state.passed_tos && this.state.passed_identifier && this.state.passed_name && !this.state.passed_referral) &&
                        <View>
                            <Text>Referrals</Text>
                            <Text>
                                {"If another user brought you here, type their email or identifier.\n\n Both you and the referrer will be rewarded "
                                    + "with credits, which are normally gained each time you post and can be used to personalize your account in the future."}
                            </Text>
                            <View style={{ padding: 15 }}>
                                <FormLabel>Email or Identifier</FormLabel>
                                <FormInput onChangeText={(text) => this.setState({ referrer_valid: false, referral_message: '', referrer_field: text, referrer: '' })} />
                                {!this.state.referral_valid && <FormValidationMessage>{this.state.referral_message}</FormValidationMessage>}
                                {this.state.referral_valid && <Text>{this.state.referral_message}</Text>}
                            </View>
                            <View
                                style={{ marginBottom: 5 }} >
                                <Button
                                    title={"Check"}
                                    loading={this.state.checkLoading}
                                    disabled={this.state.checkDisabled}
                                    onPress={this.checkUser} />
                            </View>
                            <View
                                style={{ marginTop: 5 }}
                                style={layout.row}>
                                <Button
                                    title={"Skip"}
                                    onPress={this.goToMenu} />
                                <Button
                                    title={"Submit"}
                                    disabled={!this.state.referral_valid}
                                    onPress={this.addReferral} />
                            </View>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    }
});

const layout = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },

    tos: {
        flex: 5
    }
});

export default Welcome;
