const Sequelize = require('sequelize');
const db = require('../db/db')
const Follow = require('./Follow');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.STRING,
        unique: true
    },
    profile_picture: {
        type: Sequelize.STRING,
        unique: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    fullname: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
    },
   
    bio: {
        type: Sequelize.STRING,
    },

    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }, 
    suspend: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }, 
    following_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    follower_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
 

});


// Users.hasMany(Follow, { as: 'following', foreignKey: 'following_id' });
// Users.hasMany(Follow, { as: 'followers', foreignKey: 'follower_id' });

Users.belongsToMany(Users, { through: Follow, as: 'followers', foreignKey: 'following_id' });
Users.belongsToMany(Users, { through: Follow, as: 'following', foreignKey: 'follower_id' });



module.exports = Users