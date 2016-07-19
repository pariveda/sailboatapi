'use strict';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.handler = function(event, context, cb) {
    // Check username and pass
    var requestUsername = event.body.username;
    var requestPassword = event.body.password;
    // TODO: Replace hardcoded username/password check with call to db or whatever
    if (requestUsername != "admin" || requestPassword != "password") {
        return cb("Error, incorrect username or password", null);
    }

    // Generate jwt access token
    // TODO Update example values
    var payload = {
        "iss": "https://api.example.com",
        "scopes": ["admin", "some_thing", "another_thing"],
        "sub": {
            user_id: "123abc"
        }
    };
    // TODO: Update to get secret signing string from env
    var access_token = jwt.sign(payload, "process.env.SECRET", {
        expiresIn: 60 * 60 * 12 // 12 hours
    });

    return cb(null, {"token": access_token});
};
