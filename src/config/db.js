const {config}=require('dotenv')
config()
const pg = require('pg')

const { Sequelize } = require("sequelize");

// const db = new Sequelize(
//   `${process.env.DATABASE_URL}`,
  
//   {
//     dialect: "postgres",
//     dialectModule:pg,
//   }
// );

const db = new Sequelize(`${process.env.DATABASE_URL}`, {
  dialect:'postgres',
  dialectModule:pg
})


module.exports = db;
