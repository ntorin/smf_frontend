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
            <ListItem
                rowData={rowData}
                type={this.props.type}
                onPress={this.props.onPress ? this.props.onPress : () => { }}
                onLongPress={this.props.onLongPress ? this.props.onLongPress : () => { }} />
        )
    }

    renderSeparator() {
        return (
            <View style={{ backgroundColor: "#000000", height: StyleSheet.hairlineWidth }} />
        )
    }
    renderPaginationAllLoadedView() {
        return (<View />);
    }

    scrollToLocation(location){
        this.refs.giftedlistview.scrollToLocation(location);
    }

    getYPos(){
        return this.refs.giftedlistview.getScrollPosY();
    }

    resetYPos(){
        this.refs.giftedlistview.resetScrollPosY();
    }

    paginationFetchingView() { return (<View><Text>{'Loading...'}</Text></View>); }

    render() {
        return (
            <GiftedListView
                ref={'giftedlistview'}
                rowView={this.renderRowView}
                onFetch={this.props.onFetch}
                firstLoader={true} // display a loader for the first fetching
                pagination={this.props.pagination ? this.props.pagination : false} // enable infinite scrolling using touch to load more
                refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                withSections={false} // enable sections
                renderSeparator={this.renderSeparator}
                forceUpdate={this.props.forceUpdate}
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
