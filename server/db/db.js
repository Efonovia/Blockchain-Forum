const { Sequelize } = require('sequelize');
const dotenv = require('dotenv')
// enable secure credentials
dotenv.config()
  module.exports =  new Sequelize(process.env.DATABASE, 'root' , process.env.PASSWORD, {
  host: process.env.LOCALHOST,
  dialect:  'mysql',
  operatorsAliases: 0,
});

 