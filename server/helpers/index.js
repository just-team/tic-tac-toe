var Message = require("../models/message");

exports.createMessage = function(message) {
    var newMessage = new Message(message);
    return newMessage.save()
}

exports.emitToAll = function(sockets, id, message) {
    for(var i in sockets) {
        sockets[i].send(message);
    }
}

exports.isInArray = function(array, index) {
    if(array.indexOf(index) > -1) return true;
    return false;
} 