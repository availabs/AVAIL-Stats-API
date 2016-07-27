'use strict';
var lib = require('functions/function1/lib')

module.exports.handler = function(event, context, cb) {
  lib.respond(event,context,function(err,response){
    return cb(err,response);    
  });
};
