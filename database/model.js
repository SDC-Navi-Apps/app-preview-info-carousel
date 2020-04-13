const mongoose = require('mongoose');
const db = require('./index.js');

const carouselSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  description: String,
  body: String,
  images: Array,
  createdAt: Date,
  updatedAt: Date
});

const Carousels = mongoose.model( 'Carousel', carouselSchema );


// findAll retrieves all appimages data
function findAll(callback) {
  Carousels.find({}, callback);
}

// findOne will retrieve the appimage associated with the given id
function findOne(id, callback) {
  Carousels.find({ id: id }, callback);
}

// insertOne inserts one appImages schema into db
function insertOne(schema, callback) {
  Carousels.insert(schema, callback);
}

// Fetch apps by id from database
function getApps(id, callback) {
  Carousels.find({ "by.id": id }, callback);
}

// Updates one appImages
// function updateOne(options, callback) {
//   Carousels.updateOne(options, callback);
// }

// Removes an entry
function removeOne(id, callback) {
  Carousels.deleteOne({id: id}, callback);
}

// Find last entry id
function findLast(callback) {
  Carousels.find({}, callback).sort({id: -1}).limit(1);
}


exports.findOne = findOne;
exports.findAll = findAll;
module.insertOne = insertOne;
exports.removeOne = removeOne;
exports.findLast = findLast;
exports.Carousels = Carousels;
module.exports = Carousels;
