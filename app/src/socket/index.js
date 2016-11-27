import * as io from 'socket.io-client/socket.io';
import SocketEmitter from '../emitters';

const socket = io.connect('http://sfast-dev.cloudapp.net:4040/', {
  transports: ['websocket']
});

SocketEmitter.addListener('connect', (name) => {
    console.log("Emitting connect. Name is :", name);
    socket.emit('connect_to_game', name);
    SocketEmitter.emit('waiting for opponent');
});

SocketEmitter.addListener('move', (data) => {
    socket.emit('move', data);
});

socket.on('game started', (data) => {
    SocketEmitter.emit('gameStarted', data);
});

socket.on('get move', (data) => {
   SocketEmitter.emit('get_move', data); 
});

socket.on('send move', (data) => {
    SocketEmitter.emit('send_move', data);
});

socket.on('finish', (data) => {
    SocketEmitter.emit('finish', data);
});

socket.on('connect_failed', function() {
    console.log("There seems to be an issue with the connection!");
});

socket.on('error', function(err) {
    console.log("Error on socket:", err);
});
