'use strict';

var lib = require('../libs/index');

module.exports.handler = function(event, context, cb) {
  switch(event.httpMethod) {
    case 'POST':
      lib.create(event, cb);
      break;
    case 'GET':
      if (event.id) {
        lib.retrieve(event, cb);
      } else {
        lib.retrieveMultiple(event, cb);
      }
      break;
    case 'PUT':
      lib.update(event, cb);
      break;
    case 'DELETE':
      lib.delete(event, cb);
      break;
    default:
      return cb("Error, unsupported endpoint http method: " + event.httpMethod, "whaaaaaat?");
  }
};
