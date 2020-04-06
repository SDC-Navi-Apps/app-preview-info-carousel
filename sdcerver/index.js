// require('dotenv').config();
const express = require('express');
const path = require('path');
// const { Client } = require('pg');
var connectionString = 'postgres://postgres:admin@PaSsWoRd!:5432/appimages';
const Applications = require('../databased/postgreSQL/models.js').Applications;
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('../database/index.js');

// Applications.connect();
// const client = new Client({
//   connectionString: connectionString
// })

// Applications.connect();
const app = express();
const PORT =  3003;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// 'http://ec2-52-53-128-255.us-west-1.compute.amazonaws.com:80'

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/CRUD/:id', (req, res) => {
  // console.log(req.body)
  var options = {
    id: req.body.id,
    description: req.body.app_description,
    body: req.body.additional_text,
    images: req.body.images,
    createdAt: Date.now().toISOString(),
    updatedAt: Date.now().toISOString()
  };

  Applications.create(options, (err, results) => {
    if (err) {
      return console.log('error creating document: ', err)
    }
    res.json(results);
  })
});

app.get('/api/CRUD/:id', (req, res) => {
  // res.sendStatus(200);
  Applications.findAll({where:{id: req.params.id}}, (err, results) => {
    if (err) {
      // res,sendStatus(404);
      return console.log('error getting from db: ', err)
    }
    // res.sendStatus(200);
    res.json(results);
  })
});

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



