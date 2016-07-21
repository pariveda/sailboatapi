
var jwt = require('jsonwebtoken');

exports.handler = function(event, context) {
    console.log("attempting authorization");
    var token = event.authorizationToken.split(" ");
    if (token[0] !== "Bearer" || !token[1]) {
        throw "Error: Bearer token not in expected format";
    }
    token = token[1];

    // TODO: Update to get secret signing string from env
    jwt.verify(token, "process.env.SECRET_TOKEN_SIGNING_STRING", function(err, decoded) {
        if (err) {
            context.fail("Unauthorized");
        } else {
            var authResponse = {
                principalId: decoded.sub,
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: decoded.scopes
                }
            };
            console.log("authorized");
            context.succeed(authResponse);
        }
    });
};

