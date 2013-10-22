
var api = require('./lib/fake-api');
var requestState = require('./lib/request-state');
var crc32 = require('./lib/crc32');

var NUM_TESTS = 10;
var token = 0;


// Just to be storing an object, instead of some primitive
var Token = function(){
    this.value = Math.floor(Math.random() * Date.now());
};

Token.prototype.toString = function(){
    return crc32(this.value);
};

//  do something with promises returned from the bus
api.on('completed', function(saving){

    var clsToken = requestState.get('token');

    saving.then(function(data){
        console.log('ok:', data);
        assert(clsToken === data.token, 'comparing tokens on completion');
    },function(err){
        console.log('prob:', err);
    })
});

for (var i = 0; i < NUM_TESTS; i++) {

    requestState.run(function(){

        var token = new Token();
        requestState.set('token', token);
        api.emit('save', token);

    });

};

