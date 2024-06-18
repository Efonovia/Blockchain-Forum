const Sequelize = require("sequelize");
const db = require("../db/db");
const Users = require("./Users.js");
const UserBlogs = require("./userblog.js");

const UserComments = db.define("userblog_comments", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
    onDelete: 'CASCADE',
  },
  blog_id: {
    type: Sequelize.INTEGER,
    references: {
      model: UserBlogs,
      key: "id",
    },
    onDelete: 'CASCADE',
  },
  comments: {
    type: Sequelize.STRING,
  }
});

// Set up the foreign key relationship between the LikesCount -> Post && LikesCount -> User
// UserComments.belongsTo(Users, {  foreignKey: "user_id" });
UserComments.belongsTo(Users, { foreignKey: "user_id", as: "users" });


module.exports = UserComments;
