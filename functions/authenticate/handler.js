'use strict';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.handler = function(event, context, cb) {

    // Get user info and check username and pass (You'll need to update this for production!)
    if (event.body.username != "admin" || event.body.password != "password") {
        return cb("Error, incorrect username or password", null);
    }

    // Generate jwt access token with user permissions, and sign
    var payload = {
        "iss": "https://api.example.com",
        "sub": "123abcUserIdHere",
        "scopes": [
            {
                Action: 'execute-api:Invoke',
                Effect: 'Allow',
                Resource: 'arn:aws:execute-api:us-west-2:280151647364:fsapgttgb6/dev/*'
            }
        ]
    };
    // TODO: Update to get secret signing string from env
    var access_token = jwt.sign(payload, "process.env.SECRET_TOKEN_SIGNING_STRING", {
        expiresIn: 60 * 60 * 8 // 8 hours
    });

    return cb(null, {"token": access_token});
};
