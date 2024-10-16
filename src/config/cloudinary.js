const dotenv = require("dotenv");
dotenv.config();

const { v2: cloudinary } = require("cloudinary");

const cloudinaryConfig = (_, res, next) => {
  cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
  });
  next();
};
module.exports = cloudinaryConfig
