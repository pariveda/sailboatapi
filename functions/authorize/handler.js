console.log('Loading function');

exports.handler = function(event, context) {

    console.log('Client token: ' + event.authorizationToken);
    console.log('Method ARN: ' + event.methodArn);

    var token = event.authorizationToken;

    // Call oauth provider, crack jwt token, etc.

    var result = 'allow';

    switch (result) {
        case 'allow':
            context.succeed(generatePolicy('user', 'Allow', 'arn:aws:execute-api:us-west-2:280151647364:fsapgttgb6/dev/*'));
            break;
        case 'deny':
            context.succeed(generatePolicy('user', 'Deny', 'arn:aws:execute-api:us-west-2:280151647364:fsapgttgb6/dev/*'));
            break;
        case 'unauthorized':
            context.fail("Unauthorized");
            break;
        default:
            context.fail("error");
    }
};

var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {
        'principalId':principalId
    };
    if (effect && resource) {
        authResponse.policyDocument = {
            'Version': '2012-10-17',
            'Statement': [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }]
        };
    }
    return authResponse;
};
