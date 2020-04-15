const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('appimages', 'jakedunnicliff', '', {
  host: 'localhost',
  dialect: 'postgres'
});

class Applications extends Model {}
Applications.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  images: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  }
}, {sequelize, modelName: 'applications'});



Applications.sync();

module.exports.Applications = Applications;