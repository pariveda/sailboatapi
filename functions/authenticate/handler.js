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
    var access_token = jwt.sign(payload, "mySuperSecretStringHere", { // use process.env.SECRET in production!
        expiresIn: 60 * 60 * 12 // 12 hours
    });

    // Create set-cookie header for return
    var date = new Date();
    date.setTime(+ date + (100 * 60 * 60 * 12)); // 12 hours
    var cookieString = "X-Api-Key="+access_token+"; expires="+date.toGMTString()+";";

    return cb(null, {"Cookie": cookieString});
};
