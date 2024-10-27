const { Transaction } = require("sequelize");
const {
  createTransaction,
  findAlltransaction,
  findOneTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions");
const { verifyToken } = require("../middleware/verifyToken");
const transactionRouter = require("express").Router();

transactionRouter.post(`/`,verifyToken, createTransaction);
transactionRouter.get("/", findAlltransaction);
transactionRouter.get("/:id", findOneTransaction);
transactionRouter.patch("/:id", updateTransaction);
transactionRouter.delete("/:id", deleteTransaction);

module.exports = transactionRouter;

