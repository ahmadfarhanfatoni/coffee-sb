const users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password: userPassword,
      number,
      firstName,
      lastName,
      category,
    } = req.body;

    const existUser = await users.findOne({where:{
      email
    }})
    if(existUser){
      return res.status(400).json({msg : 'user has ban register'})
    }

    const salt = await bcrypt.genSalt();
    const encryptPassword = await bcrypt.hash(userPassword, salt);
    const data = await users.create({
      name,
      email,
      password: encryptPassword,
      number,
      firstName,
      lastName,
      category,
      role: "user",
    });

    res.status(201).json({ msg: "success resgister user", data });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "internal server error", error });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const userPassword = user.getDataValue("password");
    const match = await bcrypt.compare(password, userPassword);
    if (!match) {
      return res.status(400).json({ msg: "Wrong email or password" });
    }
    const token = jwt.sign(
      { email, id : user.getDataValue("id"), role : user.getDataValue("role") },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({ msg: "Login Sucess", token });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ msg: "intrnal server error", error });
  }
};
module.exports = {
  register,
  login
};
