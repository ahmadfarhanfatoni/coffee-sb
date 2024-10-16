const authRouter = require("./auth");
const productRouter = require("./product");
const promotionRouter = require("./promotion");
const transactionRouter = require("./transaction");
const userRouter = require("./user");

const route = require("express").Router();

route.use("/product", productRouter);
route.use("/user", userRouter)
route.use("/transaction", transactionRouter)
route.use("/promotion", promotionRouter)
route.use("/auth", authRouter)



module.exports = route;
