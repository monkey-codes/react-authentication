## React, Redux & Node - Authentication

Example of token based (JWT) authentication using React & Redux frontend with a Node backend.

Backend stores encrypted passwords (`bcrypt-nodejs`) in a mongo db (`mongoose`). Passport (`passport-jwt` & `passport-local`) provides
authentication strategies.


##Usage

Clone the repo:
```
$ git@github.com:monkey-codes/react-authentication.git
$ cd react-authentication
```

###MongoDB
To run a mongo DB using Docker:
```
$ mkdir mongo-data
$ docker run --name react-auth-mongo --rm -p 27017:27017 -v $(pwd)/mongo-data:/data/db mongo
```

###Server
Using node 6.8.0

```
$ cd server
$ npm install
$ npm run dev
```

###Client
```
$ cd client
$ npm install
$ npm run start
```

To get browser live reload (Ruby Guard):
```
$ cd client
$ bundle install
$ guard
```
