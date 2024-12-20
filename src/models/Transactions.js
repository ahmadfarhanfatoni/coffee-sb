const { DataTypes } = require('sequelize')
const db = require("../config/db");
const products = require("./Products");
const users = require("./Users");

const transactions = db.define(
  "trsnsaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
    },

    description: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model:products,
        key : 'id'
      }
    },
    quantity: {
      type: DataTypes.STRING,
    },
    totalAmount: {
      type: DataTypes.STRING,
    },
    transactionDate: {
      type: DataTypes.STRING,
    },
   

    paymentMethod: {
      type: DataTypes.STRING,
    },
    status : {
      type:DataTypes.STRING
    }
  },
  {
    timestamps: true,
  }
);

module.exports = transactions;

transactions.belongsTo(users, {foreignKey : 'userId', as : 'users'})
transactions.belongsTo(products, {foreignKey : 'productId', as : 'products'})
users.hasMany(transactions, {foreignKey : 'id'})
products.hasMany(transactions, {foreignKey : 'id'})
