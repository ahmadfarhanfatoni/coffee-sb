const { Op } = require("sequelize");
const users = require("../models/Users");

const createUser = async (req, res) => {
  try {
    const { name, email, password, number, firstName, lastName, category } = req.body;
    const file = req.file ? req.file?.path : null;

    const data = await users.create({
      name: name,
      email: email,
      image: file,
      password: password,
      number: number,
      firstName: firstName,
      lastName: lastName,
      category: category
    });
    res.status(201).json({
      msg: "succes create users",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "failed create users",
      error,
    });
  }
};

const findAllUsers = async (req, res) => {
  const { search, orderBy, sortBy, limit, page, category } = req.query;

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
    const data = await users.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json({
      msg: " success find all user",
      data: data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const findOneUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await users.findByPk(id);
    res.status(200).json({
      msg: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, number, firstName, lastName, category } = req.body;
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User Not found" });
    }
    if (req.file) {
      await user.update({
        name,
       email,
       password,
       number,
        image: req?.file?.path,
      });
      return res.status(200).json({
        msg: "Success Update user with image",
        data: user,
      });
    }
    await user.update({ name, email, password, number, firstName, lastName, category });
    await user.save();
    res.status(200).json({
      msg: "Success Update Product",
      data: user,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ msg: "User Not found" });
    }
    await user.destroy();
    await user.save();
    res.status(500).json({
      msg: "Success Delete user",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findOneUsers,
  updateUsers,
  deleteUser,
};
