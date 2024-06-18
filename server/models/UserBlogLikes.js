const Sequelize = require("sequelize");
const db = require("../db/db");
const Users = require("./Users.js");
const UserBlogs = require("./userblog.js");

const UserBlogLikes = db.define("userblog_likes", {
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
});

// Set up the foreign key relationship between the LikesCount -> Post && LikesCount -> User
// UserBlogLikes.belongsTo(UserBlogs, { foreignKey: "blog_id" });
// UserBlogLikes.belongsTo(Users, { foreignKey: "user_id" });

module.exports = UserBlogLikes;
