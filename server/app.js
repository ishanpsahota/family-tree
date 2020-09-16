const express = require('express')
const mongoose = require('mongoose')
// const path = require('path')
const bodyParser = require('body-parser')
const routes = require('./routes')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', function()
{
    console.log('Connection established');
}).on('error', function(err)
{
    console.log('Connection error: ' + err);
});

app.use(cors());

app.use(bodyParser.json());
app.use('/', routes);
app.use(helmet())

module.exports = app;