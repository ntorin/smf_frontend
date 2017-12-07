import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import ListItem from 'components/ListItem';
import BaseStyles from 'helpers/styles.js';

class PopulatableListView extends React.Component {

    constructor(props) {
        super(props);
        this.renderRowView = this.renderRowView.bind(this);
    }

    renderRowView(rowData) {
        return (
            <ListItem rowData={rowData} type={this.props.type} onPress={this.props.onPress} />
        )
    }

    renderSeparator(){
        return (
            <View style={{padding: 5}}/>
        )
    }

    render() {
        return (
            <GiftedListView
                rowView={this.renderRowView}
                onFetch={this.props.onFetch}
                firstLoader={true} // display a loader for the first fetching
                pagination={this.props.pagination} // enable infinite scrolling using touch to load more
                refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                withSections={false} // enable sections
                renderSeparator={this.renderSeparator}
                customStyles={{
                    paginationView: {
                        backgroundColor: '#eee',
                    },
                }}

                refreshableTintColor="blue"
            />
        )
    }
}

const styles = StyleSheet.create({

});

const layout = StyleSheet.create({

});

export default PopulatableListView;
