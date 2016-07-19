console.log('Loading function');

exports.handler = function(event, context) {
    var token = event.authorizationToken;

    // Call oauth provider, crack jwt token, etc.

    var result = 'allow';

    switch (result) {
        case 'allow':
            console.log("allow");
            context.succeed(generatePolicy('user', 'Allow', event.methodArn));
            break;
        case 'deny':
            context.succeed(generatePolicy('user', 'Deny', event.methodArn));
            break;
        case 'unauthorized':
            context.fail("Unauthorized");
            break;
        default:
            context.fail("error");
    }
};

var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
};
