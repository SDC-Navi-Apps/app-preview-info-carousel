// require('dotenv').config();
require('newrelic');
const express = require('express');
const path = require('path');
const { Pool, Client} = require('pg');
const connectionString = 'postgressql://jakedunnicliff@localhost:5432/appimages';
const Applications = require('../databased/postgreSQL/models.js').Applications;
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const moment = require('moment');

const AWS = require('aws-sdk');

// Applications.connect();
// const client = new Client({
//   connectionString: connectionString
// })

// Applications.connect();
const client = new Client({
  connectionString: connectionString
})
client.connect();
// const pool = new Pool({"connectionString": connectionString})
const app = express();
const PORT =  3003;

app.use('/:id', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 'http://ec2-52-53-128-255.us-west-1.compute.amazonaws.com:80'

app.use('/:id', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/CRUD/:id', (req, res) => {
  const { id, description, body, images } = req.body;
  console.log(req)
  var now = moment().toISOString();
  var arr = [id, description, body, images, now, now];
  // console.log(arr);
  var queryString6 = 'INSERT INTO applications (id, description, body, images, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6);';

  client.query(queryString6, arr, (err, results) => {
    if (err) {
      console.log('error creating document: ', err);
      res.send(err);
    }
    // client.end();
    res.json(results);
  })
});

app.get('/api/CRUD/:id', (req, res) => {
  // res.sendStatus(200);
  // console.log(req.params.id);
  client.query(`select * from applications where id=${parseInt(req.params.id)}`, (err, results) => {
    if (err) {
      // res,sendStatus(404);
      return console.log('error getting from db: ', err)
    }
    // res.sendStatus(200);
    // console.log(results);
    res.json(results.rows[0]);
  })
});

// app.get('/api/CRUD/:id', (req, res) => {
//   pool.findAll({where:{id: parseInt(req.params.id)}})
//     .then((data) => {
//       res.json(null, data)
//     })
//     .catch((err) => {
//       res.json(err)
//     })
// })



app.put('/api/CRUD/:id', (req, res) => {
  // console.log(req);
  var options = {
    id: req.body.id,
    app_description: req.body.app_description,
    additional_text: req.body.additional_text,
    images: req.body.images
  };
  // console.log(options);
  Applications.updateOne({id: req.body.id}, options, (err, results) => {
    if (err) {
      return console.log(`error updating id-${options.id}: `, err)
    }
    res.sendStatus(200);
  })
});

app.delete('/api/CRUD/:id', (req, res) => {
  Applications.deleteOne({id: req.params.id}, (err, results) => {
    if (err) {
      return console.log(`error deleting id-${req.params.id}: `, err)
    }
    res.sendStatus(200);
  })
});



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app



