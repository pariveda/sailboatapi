'use strict';

var db = require('dynamodb');

module.exports.handler = function(event, context, cb) {
  switch(event.httpMethod) {
    case 'POST':
      db.create(event.collection, event.body, cb);
      break;
    case 'GET':
      if (event.id) {
        db.retrieve(event.collection, event.id, cb);
      } else {
        db.retrieveMultiple(event.collection, cb);
      }
      break;
    case 'PUT':
      db.update(event.collection, event.id, event.body, cb);
      break;
    case 'DELETE':
      db.delete(event.collection, event.id, cb);
      break;
    default:
      return cb("Error, unsupported endpoint http method: " + event.httpMethod, "whaaaaaat?");
  }
};
