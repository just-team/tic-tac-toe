import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

import SocketEmitter from '../emitters';
import Styles from '../styles';

export default class GameBox extends Component {
    constructor(props) {
        super(props);
        SocketEmitter.addListener('get_move', (data) => {
            if(this.props.number == data.field) {
                this.setState({text: data.type == 0?"X":"O"});
            }
        });
    }
    
    state = {text: " "};

    handlePress() {
        SocketEmitter.emit('move', {move: this.props.number});
        console.log(this.props.number);
    }

    render() {
        return(
            <TouchableHighlight  style={Styles.gameSquare} onPress={this.handlePress.bind(this)}>
                <Text style={Styles.gameBoxText}>{this.state.text}</Text> 
            </TouchableHighlight>
        )
    }
}