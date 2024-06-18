const Sequelize = require('sequelize');
const db = require('../db/db');
const Users = require('./Users');

const Follow = db.define('follows', {
 
  following_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  follower_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Users,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, 
);

module.exports = Follow;
