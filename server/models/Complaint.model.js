const Sequelize = require("sequelize");
const db = require("../db/db");
const Users = require("./Users.js");

const Complaint = db.define("complaints", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
    allowNull: false,
    onDelete: "CASCADE",
  },
  dateCreated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  },
  messages: {
    type: Sequelize.JSON,
    allowNull: false,
    defaultValue: [],
    validate: {
      isArrayOfObjects(value) {
        if (!Array.isArray(value)) {
          throw new Error('Messages must be an array');
        }
        value.forEach(message => {
          if (typeof message !== 'object' || !message.sender || !message.id || !message.messageContent || !message.dateSent) {
            throw new Error('Each message must be an object with sender, id, messageContent, and dateSent fields');
          }
        });
      }
    }
  },
});

// Define association with Users
Complaint.belongsTo(Users, { foreignKey: "userId", as: "user" });

module.exports = Complaint;
