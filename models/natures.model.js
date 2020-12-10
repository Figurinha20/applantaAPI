const sequelize = require("../config/sequelizeInstance").sequelizeInstance;
const { Model, DataTypes } = require('sequelize');

class Nature extends Model {};

Nature.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    desc: {type: DataTypes.STRING(31), allowNull: false},
}, { sequelize, modelName: "Natures", createdAt:false, updatedAt:false});

sequelize.sync().then().catch(error => {
    console.log(error);
})

module.exports = Nature;