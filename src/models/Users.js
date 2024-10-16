const { DataTypes } = require("sequelize");
const db = require("../config/db");

const users = db.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image : {
        type : DataTypes.STRING
    },
    gender : {
      type: DataTypes.STRING
    },
    role : {
      type:DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
);
module.exports = users;
