
var api = require('./lib/fake-api');
var requestState = require('./lib/request-state');

var NUM_TESTS = 100;
var token = 0;

for (var i = 0; i < NUM_TESTS; i++) {
    requestState.run(function(){
        token++;
        requestState.set('token', token);
        
        api.save({
            time: Date.now()
        },token).then(function(data){
            console.log('result:', data);
        }, function(err){
            console.error('Prob:', err);
        });
        
    });
    

};

