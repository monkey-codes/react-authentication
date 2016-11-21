//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup
//db name is 'auth'
mongoose.connect('mongodb://localhost:auth/auth');

//App setup
//app.use = register middleware in express.
//morgan logs  requests.
app.use(morgan('combined'));
app.use(cors());
//middleware to parse incoming requests.
app.use(bodyParser.json({type: '*/*'}))
router(app);


//Server Setup
const port = process.env.PORT || 3090;
//http is low level node
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on ', port);
