'use strict';
var lib = require('functions/users/lib')

module.exports.handler = function(event, context, cb) {
  lib.respond(event,context,function(err,response){
    return cb(err,response);    
  });
};
