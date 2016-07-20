var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();
var uuid = require("node-uuid");

module.exports.create = function(collection, body, cb) {
    body["collection"] = collection;
    body["id"] = "" + uuid.v4();
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        Item: body
    };
    docClient.put(params, function(err, _) {
        if (err) {
            return cb(err, null)
        }
        return cb(null, {"Item":body});
    });
};

module.exports.retrieve = function(collection, id, cb) {
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        Key: {
            "collection": collection,
            "id": id
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
};

module.exports.retrieveMultiple = function(collection, cb) {
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        FilterExpression: "#k = :v",
        ExpressionAttributeNames: {
            "#k": "collection"
        },
        ExpressionAttributeValues: {
            ":v": collection
        }
    };
    docClient.scan(params, function onScan(err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
};

module.exports.update = function(collection, id, body, cb) {
    var updateValues = body;

    updateValues.collection = collection;
    updateValues.id = id;

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
        docClient.put(params, function(err, _) {
            if (err) {
                return cb(err, null)
            }
            return cb(null, {"Item":currentValues});
        });
    });
};

module.exports.delete = function(collection, id, cb) {
    var params = {
        TableName: process.env.RESOURCES_TABLE_NAME,
        Key: {
            "collection": collection,
            "id": id
        }
    };
    docClient.delete(params, function(err, _) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, {"Item":params.Key});
    });
};

