const express = require('express');
const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const db = require('./config/db');

const server = express();
const port = 8000;

server.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(db.url, { useMongoClient: true });
const dbConnection = mongoose.connection;

dbConnection.on('error', console.error.bind(console, 'connection-error'));

dbConnection.once('open', () => {
  require('./app/routes')(server, {});

  server.listen(port, () => {
    console.warn('we are ready :)');
  });
});

// MongoClient.connect(db.url, (err, database) => {
//   if (err) return console.log(err)

//   require('./app/routes')(server, {});

//   server.listen(port, () => {
//     console.warn('we are ready :)');
//   });
// });


