//untuk menambahkan product(create)

const { Op } = require("sequelize");
const products = require("../models/Products");
const db = require("../config/db");

const createProduct = async (req, res) => {
  try {
    // const {id} = req.payload
    // console.log({id});

    //menangkap inputan dari user
    const { name, price, decription, size, category = "drink" } = req.body;

    const file = req.file ? req.file?.path : null;

    // masukin datanya kedatabase
    const data = await products.create({
      name: name,
      image: file,
      price: price,
      decription: decription,
      size: size,
      category: category,
    });

    //memberikan sresponse ke client
    res.status(201).json({
      msg: "success create product" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Failed create product",
      error,
    });
  }
};

//untuk melihat seluruh product(read)

const findAllProduct = async (req, res) => {
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
    where.name = { [Op.iLike]: `%${search}%` };
  }
  if (category) {
    where.category = category;
  }
  if (search && category) {
    where = {
      [Op.and]: {
        name: { [Op.iLike]: `%${search}%` },
        category: { [Op.iLike]: `%${category}%` },
      },
    };
  }
  if (orderBy && sortBy) {
    order = [[orderBy, sortBy]];
  }

  try {
    const data = await products.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json({
      msg: "Success find all product",
      data: data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

//untuk melihat satu product(read)
const findOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await db.query(`select * from "products" p where id  = ${id}`);
    res.status(200).json({ data: data[0] });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

//untuk mengupdate product(update)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, decription, size } = req.body;
    const product = await products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "Product Not found" });
    }

    if (req.file) {
      await product.update({
        name,
        price,
        decription,
        size,
        image: req?.file?.path,
      });
      return res.status(200).json({
        msg: "Success Update Product with image",
        data: product,
      });
    }
    await product.update({ name, price, decription, size });
    await product.save();
    res.status(200).json({
      msg: "Success Update Product",
      data: product,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

//untuk menghapus product(delete)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await products.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: "Product Not found" });
    }
    await product.destroy();
    await product.save();
    res.status(500).json({
      msg: "Success Delete Product",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  findAllProduct,
  findOneProduct,
  updateProduct,
  deleteProduct,
};
