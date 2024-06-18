const Sequelize = require("sequelize");
const {sequelize} = require("../db/db");
const db = require("../db/db");
const Users = require("./Users.js");
const UserComments = require("./UserComments");
const UserBlogLikes = require("./UserBlogLikes");



const UserBlogs = db.define("userblogs", {
  
  content: {
    type: Sequelize.STRING,
  },
  images: {
    type: Sequelize.STRING,
    defaultValue:"",
  },

  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
        key: "id",
    },
    onDelete: "CASCADE",
  },

  ref: {
    type: Sequelize.STRING,
  },

  comments_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },

  likes_count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});


UserBlogs.belongsTo(Users, { foreignKey: "user_id", as: "users" });
UserBlogs.hasMany(UserComments, { foreignKey: 'blog_id', as: "usercomments" });
UserBlogs.hasMany(UserBlogLikes, { foreignKey: 'blog_id', as: "userbloglikes" });


    
module.exports = UserBlogs;
