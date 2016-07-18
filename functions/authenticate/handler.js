'use strict';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.handler = function(event, context, cb) {

    // Check username and pass
    var requestUsername = "";
    var requestPassword = "";

    // Generate jwt access token
    var payload = {
        "iss": "https://api.example.com",
        "scopes": ["admin", "some_thing", "another_thing"],
        "sub": {
            user_id: "123abc"
        }
    };
    var access_token = jwt.sign(payload, "process.env.SECRET", {
        expiresIn: 60*60*3
    });

    // Create set-cookie header for return
    var date = new Date();
    date.setTime(+ date + (365 * 86400000)); // 24 * 60 * 60 * 100 (365 days)
    var cookieString = "X-Api-Key="+access_token+"; expires="+date.toGMTString()+";";

    return cb(null, {"Cookie": cookieString});
};
