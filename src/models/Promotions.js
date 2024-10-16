const {DataTypes} = require("sequelize")
const db = require ("../config/db")

const promotions = db.define('promotion',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING
    },
    code : {
        type : DataTypes.STRING
    },
    description : {
        type : DataTypes.STRING
    },
    startDate : {
        type : DataTypes.STRING
    },
    image : {
        type : DataTypes.STRING
    },
    endDate : {
        type : DataTypes.STRING
    },
    category :{
        type : DataTypes.STRING
    },
},{
    timestamps : true
})
module.exports = promotions