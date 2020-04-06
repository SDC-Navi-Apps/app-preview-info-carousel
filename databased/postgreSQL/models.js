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



// sequelize.define('Application', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true
//   },
//   description: {
//     type: Sequelize.STRING(255),
//     allowNull: false
//   },
//   body: {
//     type: Sequelize.TEXT,
//     allowNull: true
//   },
//   images: {
//     type: Sequelize.ARRAY(Sequelize.TEXT)
//   }
// })

// class AppImages extends Model {}
// AppImages.init({
//   id: {
//     type: Sequelize.INTEGER.
//     primaryKey: true
//   },
//   image1: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image2: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image3: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image4: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image5: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image6: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image7: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image8: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image9: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   },
//   image10: {
//     type: Sequelize.STRING(150),
//     allowNull: true
//   }
// });


Applications.sync();

// AppImages.belongsTo(Application, {foreignKey: 'image_id', targetKey: 'id'});
// Application.create();
module.exports.Applications = Applications;
// module.exports.AppImages = AppImages;