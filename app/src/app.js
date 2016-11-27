import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Scenes from './scenes';


export default class X_O extends Component {
    render() {
        return (
           <Scenes />
        )
    }
}

AppRegistry.registerComponent('X_O', () => X_O);