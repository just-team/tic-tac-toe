import React, {Component} from 'react';
import {Scene, Router} from 'react-native-router-flux';

import Menu from './menu';
import GameBoard from './gameBoard';
import GameOver from './gameOver';
import '../socket';
export default class Scenes extends Component {
    render() {
        return (
            <Router>
                <Scene key='root'>
                    <Scene key='menu' component={Menu} initial={true} title="X-O"/>
                    <Scene key='game' component={GameBoard} hideTabBar={true} hideNavBar={true}/>
                    <Scene key='gameOver' component={GameOver} hideTabBar={true} hideNavBar={true}/>
                </Scene>
            </Router>
        )
    }
}