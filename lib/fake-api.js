var Q = require('q');
var requestState = require('./request-state');
var assert = require('assert');

var FakeApi = (function(){


    return {
        save: function(data,token) {

            var clsToken = requestState.get('token');

            assert(token === clsToken, 'comparing tokens outer')

            var saving = Q.defer();

            var timer = Math.floor(Math.random() * 5000);

            setTimeout(function() {

                var clsToken = requestState.get('token');
                assert(token === clsToken, 'comparing tokens inner')

                if (clsToken % 9 === 0) {
                    saving.reject({
                        msg: 'token ok but rejecting'
                    });
                } else {
                    saving.resolve({
                        saved: 'ok',
                        timer: timer,
                        token: token,
                        clsToken: clsToken
                    });    
                }

                

            }, timer);


            return saving.promise;
        }
    }

})();



module.exports = FakeApi;