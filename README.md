#Sailboat API

Serverless Framework API project example using AWS APIGateway, Lambda and Dyanmodb. Demonstrates a REST API with full CRUD functionality and JWT token endpoint protection.

Built to be used with https://github.com/pariveda/sailboat as a serverless frontend allowing a complete serverless architecture. 

This template project was built off of the Serverless starter project located here: https://github.com/serverless/serverless-starter.

##Setup and Install

Make sure you have the [Serverless Framework](http://www.serverless.com) installed and you're using Node.js v4.0+. 
```
npm install serverless -g
```

Clone the project from github:
```
git clone https://github.com/pariveda/sailboatapi.git
```

Install project dependencies via npm in project root and in functions/:
```
npm install
cd functions/authenticate
npm install
cd ../authorize
npm install
cd ../resources
npm install
```

Make sure you have your aws cli setup and profile key and secret configured (or refer to the serverless docs for other setups). Then initialize project:
```
sls project init
```

Deploy your functions and endpoints to the stage that you created in the last step, and test:
```
sls dash deploy
```


# License

Sailboat API - Serverless Framework API project template

|                      |                                          |   
|:---------------------|:-----------------------------------------|
| **Author:**          | Dan Hogue (<dan.hogue@parivedasolutions.com>)
| **Copyright:**       | Copyright 2016, Pariveda Solutions
| **License:**         | Apache License, Version 2.0 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and 
limitations under the License.
