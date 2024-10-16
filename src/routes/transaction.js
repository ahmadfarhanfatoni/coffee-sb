const { Transaction } = require("sequelize");
const {
  createTransaction,
  findAlltransaction,
  findOneTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");
const { verifyToken } = require("../middleware/verifyToken");
const users = require("../models/Users");
const products = require("../models/Products");
const transactions = require("../models/Transactions");

const transactionRouter = require("express").Router();

transactionRouter.post(`/`,verifyToken, createTransaction);
transactionRouter.get("/", findAlltransaction);
transactionRouter.get("/:id", findOneTransaction);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);

module.exports = transactionRouter;

transactions.belongsTo(users, {foreignkey : "userId", as : "user"})
transactions.belongsTo(products, {foreignkey : "productId", as : "product"})
users.hasMany(transactions, { foreignKey : "id"})
products.hasMany(transactions, { foreignKey : "id"})
