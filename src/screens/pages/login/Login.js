import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TextInput, Platform, ScrollView, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { iconsMap, iconsLoaded } from 'helpers/icons-loader';
import { Navigation } from 'react-native-navigation';
import Background from 'components/Background';
import { BaseStyles, PrimaryColor, PrimaryDimmed, NavMenu, ScreenBackgroundColor, ANDROID_ADMOB_AD_UNIT_ID } from 'helpers/constants';
import { AUTH_POST_SIGN_IN, AUTH_POST } from 'helpers/apicalls';
import Button from 'components/Button';
import { goToHome, setAuthData } from 'helpers/constants';
import { AdMobBanner, AdMobRewarded, PublisherBanner } from 'react-native-admob';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: {},
            responseHeaders: '',
            status: '',

            loginLoading: false,
            loginDisabled: false,
            registerLoading: false,
            registerDisabled: false,
        };

        this.loginUser = this.loginUser.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.validateAuthentication = this.validateAuthentication.bind(this);
    }

    setFirstResponse = (response) => {
        this.setState({ responseHeaders: response.headers.map, status: response.status })
    }

    loginUser() {
        var email = this.state.email;
        var password = this.state.password;

        this.setState({ loginLoading: true, loginDisabled: true, registerDisabled: true })

        AUTH_POST_SIGN_IN('user0@smf.com', '313Ghioio', this.setFirstResponse)
            .then((responseJSON) => {
                this.validateAuthentication(responseJSON);
            });
    }

    registerUser() {

        var email = this.state.email;
        var password = this.state.password;
        var password_confirmation = this.state.password;

        this.setState({ registerLoading: true, registerDisabled: true, loginDisabled: true })

        AUTH_POST(email, password, password_confirmation, this.setFirstResponse)
            .then((responseJSON) => {
                this.validateAuthentication(responseJSON);
            });
    }

    isNewUser() {
        var u = this.state.user;
        return (u.accepted_tos == false || u.identifier == null || u.name == null) ? true : false;
    }

    validateAuthentication(responseJSON) {
        if (this.state.status == 200) {
            this.setState({ user: responseJSON.data })
            setAuthData(this.state.responseHeaders['uid'][0],
                this.state.responseHeaders['client'][0],
                this.state.responseHeaders['access-token'][0],
                this.state.responseHeaders['token-type'][0],
                this.state.responseHeaders['expiry'][0], responseJSON.data);
            if (this.isNewUser()) {
                this.props.navigator.push({
                    screen: 'smf_frontend.Welcome',
                    title: 'Welcome'
                });
            } else {
                goToHome();
            }
        } else {
            Alert.alert('Login Error', "Please make sure your email and password are correct, and try again.", [{ text: "OK", }])
            this.setState({ loginLoading: false, loginDisabled: false, registerLoading: false, registerDisabled: false })
        }
    }

    render() {
        return (
            <ScrollView style={layout.container} contentContainerStyle={layout.contentContainer}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image style={styles.appIcon} source={require('assets/img/loginicon.png')} />
                </View>
                <View style={layout.credentials}>
                    <Fumi
                        label={'Email'}
                        iconClass={Entypo}
                        iconName={'email'}
                        iconColor={PrimaryColor}
                        iconSize={20}
                        returnKeyType={'next'}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                    <Fumi
                        style={layout.password}
                        label={'Password'}
                        iconClass={Foundation}
                        iconName={'key'}
                        iconColor={PrimaryColor}
                        iconSize={20}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>
                <View style={layout.buttons}>
                    <View style={{ bottom: 5 }}>
                        <Button
                            title={"Login"}
                            onPress={this.loginUser}
                            loading={this.state.loginLoading}
                            disabled={this.state.loginDisabled} />
                    </View>
                    <View>
                        <Button
                            title={"Register"}
                            onPress={this.registerUser}
                            loading={this.state.registerLoading}
                            disabled={this.state.registerDisabled} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    input: {
    },

    appIcon: {
        width: 128,
        height: 128
    }
});

const layout = StyleSheet.create({
    container: {
        flex: 1
    },

    contentContainer: {
        padding: 25,
        justifyContent: 'center',
        backgroundColor: '#F9F9F9'
    },

    credentials: {
    },

    password: {
        marginTop: 4
    },

    buttons: {
        top: 25
    }
});

export default Login;
