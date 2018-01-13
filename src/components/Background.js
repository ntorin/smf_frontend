import React from 'react';
import { StyleSheet, View, Text, Image, findNodeHandle } from 'react-native';
import {BaseStyles} from 'helpers/constants.js';
import { BlurView } from 'react-native-blur';



class Background extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            viewRef: null,
            img: this.props.img,
        };
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render(){
        return(
            <View>
                <Image
                    ref={(img) => { this.backgroundImage = this.props.img; }}
                    source={this.props.img}
                    style={[styles.backgroundImage, BaseStyles.absolute]}
                    onLoadEnd={this.imageLoaded.bind(this)}
                />
                {/**this.state.viewRef && <BlurView
                    style={BaseStyles.absolute}
                    viewRef={this.state.viewRef}
                    blurType="dark"
                    blurAmount={1}
                />**/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: '#363636',
        justifyContent: 'center',
        alignItems: 'center',

    },
});

const layout = StyleSheet.create({

});

export default Background;
