'use strict';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports.handler = function(event, context, cb) {


    var user_id = "123abc";
    var access_token = "";
    var payload = {
        "iss": "https://api.example.com",
        "scopes": ["admin", "some_thing", "another_thing"],
        "sub": {
            user_id: user_id
        }
    };
    access_token = jwt.sign(payload, "process.env.SECRET", {
        expiresIn: 60*60*3
    });


    console.log("{'Cookie':event['Cookie']}");
    var date = new Date();
    // Get Unix milliseconds at current time plus 365 days
    date.setTime(+ date + (365 * 86400000)); //24 \* 60 \* 60 \* 100
    var cookieVal = Math.random().toString(36).substring(7); // Generate a random cookie string
    var cookieString = "x-api-access-token="+cookieVal+"; expires="+date.toGMTString()+";";
    //Set-Cookie: mycookie=somevalue; path=/securesite/; Expires=12/12/2010; secure; httpOnly;


    return cb(null, {"Cookie": cookieString, "Token":access_token});
};
