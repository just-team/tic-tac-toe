import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AwesomeButton from 'react-native-awesome-button';
import {Actions} from 'react-native-router-flux';

import Styles from '../styles';
import SocketEmitter from '../emitters';

export default class GameOver extends Component {
    state = {spinner: false};
    buttonPress() {
        if(this.state.spinner) return;
        
        this.setState({spinner: true});
        SocketEmitter.emit('connect', this.props.name);
    }

    render() {
        return(
            <View style={Styles.gameOverContainer}>
                <View style={{height: 300, alignItems: 'center'}}>
                    <Text style={Styles.gameOverText}>Game Over!</Text>
                    <Text style={[Styles.gameOverText, {marginBottom: 60}]}>You {this.props.win?"win!": "lose >_<"}</Text>
                    <AwesomeButton backgroundStyle={[Styles.playButton, Styles.finishButton]} states={{
                    default: {
                        text: 'Replay',
                        onPress: this.buttonPress.bind(this),
                        backgroundColor: '#1155DD',
                        spinner: this.state.spinner
                        }
                    }} />
                    <AwesomeButton backgroundStyle={[Styles.playButton, Styles.finishButton, {marginBottom: 60}]} states={{
                    default: {
                        text: 'Main menu',
                        onPress: () => Actions.menu(),
                        backgroundColor: '#ef906c'
                        }
                    }} />
                 </View>
            </View>
        )
    }
}