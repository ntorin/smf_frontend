import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { BaseStyles } from 'helpers/constants.js';
import ModalWrapper from 'react-native-modal-wrapper';

class Modal extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <ModalWrapper
                    animationType="fade"
                    onRequestClose={this.props.onRequestClose}
                    style={styles.modal}
                    visible={this.props.visible}>
                {this.props.children}
            </ModalWrapper>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').height * 0.5,
        paddingLeft: 24,
        paddingRight: 24
    }
});

const layout = StyleSheet.create({

});

export default Modal;