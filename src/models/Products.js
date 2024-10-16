const { DataTypes } = require("sequelize");
const db = require("../config/db");

const products = db.define("product",{
    id :{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING
    },
    category :{
        type : DataTypes.STRING
    },
    image : {
        type : DataTypes.STRING
    },
    price : {
        type : DataTypes.INTEGER

    },
    decription : {
        type : DataTypes.STRING
    },
    size : {
        type : DataTypes.STRING
    }

},{
    timestamps : true
})

module.exports = products