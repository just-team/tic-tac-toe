import React, {Component} from 'react';
import {Text, View, TextInput} from 'react-native';
import AwesomeButton from 'react-native-awesome-button';
import {Actions} from 'react-native-router-flux';

import Styles from '../styles';
import SocketEmitter from '../emitters';

export default class Menu extends Component {
    state = {spinner: false, name: " "};

    constructor(props) {
        super(props);
        SocketEmitter.addListener('gameStarted', (data) => {
            console.log('game started', data)
            Actions.game({text: data.opponent, gameType: data.type, name: this.state.name});
        });
    }

    buttonPress() {
        if(this.state.spinner) return;
        
        this.setState({spinner: true});
        console.log("Button pressed", this.state.name)
        SocketEmitter.emit('connect', this.state.name);
    }

    render() {
        return (
            <View style={Styles.menuView}>
                <View style={{flex: 1, height: 200}}>
                    <View>
                        <Text>Your name: </Text>
                        <TextInput onChangeText={(text) => this.setState({name: text})}/>
                    </View>
                    <AwesomeButton backgroundStyle={Styles.playButton} states={{
                                    default: {
                                    text: 'Play',
                                    onPress: this.buttonPress.bind(this),
                                    backgroundColor: '#1155DD',
                                    spinner: this.state.spinner
                                    }
                                }} />
                </View>
            </View>
        )
    }
}