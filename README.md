#Serverless Framework API project example.

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Serverless Framework API project example using AWS APIGateway, Lambda and Dyanmodb. Demonstrates a REST API with full CRUD
functionality and JWT token endpoint protection.

This template project was built off of the Serverless starter project located here: https://github.com/serverless/serverless-starter.

##Setup and Install

Make sure you have the [Serverless Framework](http://www.serverless.com) installed and you're using Node.js v4.0+. 
```
npm install serverless -g
```

Clone the project from github:
```
git clone https://github.com/pariveda/serverless-apigateway-lambda-starter.git
```

Install project dependencies via npm in project root and in functions/api/libs:
```
npm install
cd functions/api/libs
npm install
cd ../../authenticate
npm install
```

Make sure you have your aws cli setup and profile key and secret configured (or refer to the serverless docs for other setups). Then initialize project:
```
sls project init
```

Finally, deploy your functions and endpoints:
```
sls dash deploy
```


