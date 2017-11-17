import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Button from 'components/Button';
import BaseStyles, { PrimaryColor } from 'helpers/styles.js';
import DatePicker from 'react-native-datepicker'

class AdvancedSearch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateFrom: "",
            dateTo: ""
        }
    }
    //users should have name, keywords, groups?
    //groups should have name, owner, keywords...
    render() {
        return (
            <View style={BaseStyles.container}>
                <View style={layout.textPanel}>
                    <TextInput style={layout.inputBar}
                        placeholder={'🔎 Topic...'}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        autoCorrect={false}
                        autoCapitalize={'none'} />
                </View>
                <View style={layout.textPanel}>
                    <TextInput style={layout.inputBar}
                        placeholder={'🔎 Author...'}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        autoCorrect={false}
                        autoCapitalize={'none'} />
                </View>
                <View style={layout.textPanel}>
                    <TextInput style={layout.inputBar}
                        placeholder={'🔎 Tags...'}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        autoCorrect={false}
                        autoCapitalize={'none'} />
                </View>
                <View style={layout.textPanel}>
                    <TextInput style={layout.inputBar}
                        placeholder={'🔎 Keywords...'}
                        selectionColor={PrimaryColor}
                        textAlign='center'
                        autoCorrect={false}
                        autoCapitalize={'none'} />
                </View>
                <View style={layout.textPanel}>
                    <DatePicker
                        style={layout.inputBar}
                        mode="date"
                        date={this.state.dateFrom}
                        placeholder="Date From"
                        format="MM-DD-YYYY"
                        minDate="01-01-2001"
                        maxDate="12-30-2100"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ dateFrom: date }) }}
                    />
                    <DatePicker
                        style={layout.inputBar}
                        mode="date"
                        date={this.state.dateTo}
                        placeholder="Date To"
                        format="MM-DD-YYYY"
                        minDate="01-01-2001"
                        maxDate="12-30-2100"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => { this.setState({ dateTo: date }) }}
                    />
                </View>
                <View style={{ padding: 8 }}>
                    <Button>Search</Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({
    textPanel: {
        flexDirection: 'row'
    },
    inputBar: {
        flex: 10
    },
    text: {
        fontSize: 20,
        flex: 4,
        textAlignVertical: 'center'
    }
});

export default AdvancedSearch;