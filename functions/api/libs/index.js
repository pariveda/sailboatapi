var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var uuid = require("node-uuid");

module.exports.create = function(event, cb) {
    event.body["collection"] = event.collection;
    event.body["id"] = "" + uuid.v4();
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        Item: event.body
    };
    docClient.put(params, function(err, data) {
        if (err) {
            return cb(err, null)
        }
        return cb(null, {"Item":event.body});
    });
};

module.exports.retrieve = function(event, cb) {
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        Key: {
            "collection": event.collection,
            "id": event.id
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
};

module.exports.retrieveMultiple = function(event, cb) {
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        FilterExpression: "#k = :v",
        ExpressionAttributeNames: {
            "#k": "collection"
        },
        ExpressionAttributeValues: {
            ":v": event.collection
        }
    };
    docClient.scan(params, function onScan(err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
};

module.exports.update = function(event, cb) {
    var updateValues = event.body;

    updateValues.collection = event.collection;
    updateValues.id = event.id;

    var currentValues = {};
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        Key: {
            "collection": updateValues.collection,
            "id": updateValues.id
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            return cb(err, null);
        }

        currentValues = data.Item;
        for (var key in updateValues) {
            if (updateValues.hasOwnProperty(key)) {
                currentValues[key] = updateValues[key];
            }
        }

        var params = {
            TableName: process.env.RESOURCES_TABLE_NAME,
            Item: currentValues
        };
        docClient.put(params, function(err, data) {
            if (err) {
                return cb(err, null)
            }
            return cb(null, {"Item":currentValues});
        });
    });
};

module.exports.delete = function(event, cb) {
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        Key: {
            "collection": event.collection,
            "id": event.id
        }
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, {"Item":{id:event.id}});
    });
};

