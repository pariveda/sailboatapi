'use strict';

var lib = require('../libs/index');

module.exports.handler = function(event, context, cb) {
  switch(event.httpMethod) {
    case 'POST':
      lib.create(event, context.done);
      break;
    case 'GET':
      if (event.id) {
        lib.retrieve(event, context.done);
      } else {
        lib.retrieveMultiple(event, context.done);
      }
      break;
    case 'PUT':
      lib.update(event, context.done);
      break;
    case 'DELETE':
      lib.delete(event, context.done);
      break;
    default:
      return cb("Error, unsupported endpoint http method: " + event.httpMethod, "whaaaaaat?");
  }
};
