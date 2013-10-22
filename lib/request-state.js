// var domain = require('domain');

// super sketchy domain-based storage
// var ns = {
// 	run: function(cb){
// 		var d = domain.create();
// 		d.run(cb);
// 	},
// 	set: function(key, value){
// 		return process.domain[key] = value;
// 	}, 
// 	get: function(key){
// 		return process.domain[key];
// 	}
// }


var cls = require('continuation-local-storage');
var ns = cls.createNamespace('__APP_STORAGE');



module.exports = ns;