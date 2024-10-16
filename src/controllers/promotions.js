const { Op } = require("sequelize");
const promotions = require("../models/Promotions");

const createPromotions = async (req, res) => {
  try {
    const { name, code, description, startDate, endDate, category } = req.body;

    const file = req.file ? req.file?.path : null;

    const data = await promotions.create({
      name: name,
      image: file,
      code: code,
      description: description,
      startDate: startDate,
      endDate: endDate,
      category: category
    });
    res.status(201).json({
      msg: "succes create Promo",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Failed create a promotion",
      error,
    });
  }
};

const findAllpromotion = async (req, res) => {
  const {     search = "",   
    orderBy = "id", 
    sortBy = "ASC", 
    limit = 10, 
    page = 1, 
    category = "", } = req.query;

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
    const data = await promotions.findAll({
      where,
      order,
      limit,
      offset,
    });
    res.status(200).json({
      msg: " success find all promo",
      data: data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error });
  }
};

const findOnePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await promotions.findByPk(id);
    res.status(200).json({
      msg: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description, startDate, endDate, category } = req.body;
    const promotion = await promotions.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ msg: "Promo Not found" });
    }
    if (req.file) {
      await promotion.update({
        name,
       code,
       description,
        image: req?.file?.path,
      });
      return res.status(200).json({
        msg: "Success Update Promotion with image",
        data: promotion,
      });
    }
    await promotion.update({ name, code, description, startDate, endDate, category });
    await promotion.save();
    res.status(200).json({
      msg: "Success Update Promotion",
      data: promotion,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};

const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await promotions.findByPk(id);
    if (!promotion) {
      return res.status(404).json({ msg: "Promo Not found" });
    }
    await promotion.destroy();
    await promotion.save();
    res.status(500).json({
      msg: "Success Delete promotion",
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json(error);
  }
};
module.exports = {
  createPromotions,
  findAllpromotion,
  findOnePromotion,
  updatePromotion,
  deletePromotion,
};
