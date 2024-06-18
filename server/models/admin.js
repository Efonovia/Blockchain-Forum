const Sequelize = require('sequelize');
const db = require('../db/db');

const Admin = db.define('admins', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      admin_id: {
        type: Sequelize.STRING,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },  
    password: {
        type: Sequelize.STRING,
    }, 
    roles: {
        type: Sequelize.STRING,
    },
}); 


module.exports = Admin