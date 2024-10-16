const { Op } = require("sequelize");
const transactions = require("../models/Transactions");
const users = require("../models/Users");
const products = require("../models/Products");

const createTransaction = async (req, res) => {
  try {
    const { id } = req.payload;
    const {
      userId,
      description,
      productId,
      quantity,
      transactionDate,
      paymentMethod,
    } = req.body;

    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const product = await products.findByPk(productId);
    if (!product) {
      return res.status(404).json({ msg: "product not found" });
    }
    const priceProduct = product.getDataValue("price");
    const totalAmount = priceProduct * quantity;

    const data = await transactions.create({
      userId: id,
      description,
      productId,
      quantity,
      totalAmount,
      transactionDate,
      paymentMethod,
      status: "PENDING",
    });
    res.status(201).json({
      msg: "succes create transaction",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "failed create transaction",
      error,
    });
  }
};
const findAlltransaction = async (req, res) => {
  const {
    search = "",
    orderBy = "id",
    sortBy = "ASC",
    limit = 10,
    page = 1,
    category = "",
  } = req.query;

  const offset = (page - 1) * limit;
  let where = {};
  let order = [];

  if (search) {
    where = {
      name: { [Op.iLike]: "%" + search + "%" },
    };
  }
  if (category) {
    where = {
      category: category,
    };
  }
  if (search && category) {
    where = {
      [Op.and]: {
        name: { [Op.iLike]: "%" + search + "%" },
        category: { [Op.iLike]: "%" + category + "%" },
      },
    };
  }
  if (orderBy && sortBy) {
    order = [[`${orderBy}`, `${sortBy}`]];
  }
  try {
    const data = await transactions.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json({
      msg: " success find all transaction",
      data: data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const findOneTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transactions.findByPk(id,{
      include: {
        model:products,
        as:"product"
      }
    });
    if (!data) {
      return res.status(404).json({ msg: "transaction not found" });
    }
    res.status(200).json({ msg: "success find one transaction", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error", error });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId,
      description,
      productId,
      quantity,
      totalAmount,
      transactionDate,
      paymentMethod,
      status,
    } = req.body;
    const transaction = await transactions.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction Not found" });
    }
    await transaction.update({
      userId,
      description,
      productId,
      quantity,
      totalAmount,
      transactionDate,
      paymentMethod,
      status,
    });
    await transaction.save();
    res.status(200).json({
      msg: "Success Update Transaction",
      data: transaction,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await transactions.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ msg: "transaction Not found" });
    }
    await transaction.destroy();
    await transaction.save();
    res.status(500).json({
      msg: "Success Delete Transaction",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

module.exports = {
  createTransaction,
  findAlltransaction,
  findOneTransaction,
  updateTransaction,
  deleteTransaction,
};
