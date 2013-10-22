var Q = require('q');
var requestState = require('./request-state');
var assert = require('assert');
var events = require('events');

var FakeApi = (function(){

    var bus = new events.EventEmitter();
    

    var save = function save (token) {

        var clsToken = requestState.get('token');
        assert(token === clsToken, 'comparing tokens outer')

        var saving = Q.defer();
        var timer = Math.floor(Math.random() * 3000);
        
        setTimeout(function() {
            var clsToken = requestState.get('token');
            assert(token === clsToken, 'comparing tokens inner')
            saving.resolve({
                saved: 'ok',
                token: token,
                clsToken: clsToken
            });    
        }, timer);

        bus.emit('completed', saving.promise);

    }

    // listen for commands
    bus.on('save', save);

    return {
        on: bus.on.bind(bus),
        emit: bus.emit.bind(bus)
    }

})();



module.exports = FakeApi;