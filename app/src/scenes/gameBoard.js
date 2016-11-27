import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';


import Styles from '../styles'; 
import GameBox from '../elements/gameBox';
import SocketEmitter from '../emitters';

export default class GameBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {opponent: this.props.text, turn: "Opponent's turn", type: this.props.gameType, move: false};
        SocketEmitter.addListener('send_move', (data) => {
            this.setState({move: true, turn: "Your turn"});
        });

        SocketEmitter.addListener('finish', (data) => {
            Actions.gameOver({win: data.win, name: this.props.name});
        });
    }

    renderBoxes() {
        const boxes = [];
        for(var i = 0; i < 9; i++) {
            boxes.push(
                <GameBox key={i} number={i} />
            );
        };
        return boxes;
    }
    boxes = this.renderBoxes();
    render() {
        return (
            <View style={Styles.gameContainer}>
                <View>
                    <Text>Opponent - {this.state.opponent}</Text>
                    <Text>You are - {this.state.type == 0?"X":"O"}</Text>
                    <Text> {this.state.turn} </Text>
                </View>
                <View style={Styles.gameBoard}> 
                    {this.boxes}
                </View>
            </View>
        )
    }
}