'use strict';
var lib = require('functions/logins/lib')

module.exports.handler = function(event, context, cb) {
  lib.respond(event,context,function(err,response){
    return cb(err,response);    
  });
};
