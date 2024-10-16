// const express = require("express");
const {
  createUser,
  findAllUsers,
  findOneUsers,
  updateUsers,
  deleteUser,
} = require("../controllers/users");
const upload = require("../middleware/upload");
const { verifyAdmin, verifyToken } = require("../middleware/verifyToken");

const userRouter = require("express").Router();

userRouter.post(`/`, createUser);
userRouter.get("/", findAllUsers);
userRouter.get("/:id", findOneUsers);
userRouter.patch("/:id",verifyAdmin,verifyToken, upload.single("image"), updateUsers);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
