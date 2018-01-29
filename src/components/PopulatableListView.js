import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import ListItem from 'components/ListItem';
import { BaseStyles } from 'helpers/constants.js';

class PopulatableListView extends React.Component {

    constructor(props) {
        super(props);
        this.renderRowView = this.renderRowView.bind(this);
    }

    renderRowView(rowData) {
        return (
            <ListItem rowData={rowData} type={this.props.type} onPress={this.props.onPress} onLongPress={this.props.onLongPress} />
        )
    }

    renderSeparator() {
        return (
            <View style={{ backgroundColor: "#000000", height: StyleSheet.hairlineWidth }} />
        )
    }
    renderPaginationAllLoadedView() {
        return (<View/>);
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
                paginationAllLoadedView={this.renderPaginationAllLoadedView}
                enableEmptySections={true}
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
