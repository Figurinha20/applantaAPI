const sequelize = require("../config/sequelizeInstance").sequelizeInstance;
const { Model, DataTypes } = require('sequelize');
const Nature = require("./natures.model");

class Plant extends Model {};

/**
 * @typedef Plant
 * @property {integer} id.required - Auto Increments
 * @property {string} name.required 
 * @property {string} species.required
 * @property {string} desc.required 
 * @property {integer} pitch.required - Created Randomly
 * @property {integer} nature_id.required
 */

Plant.init({
    bt_token: {type: DataTypes.STRING(255), unique: true, allowNull: false},
    name: {type: DataTypes.STRING(31), allowNull: false},
    species: {type: DataTypes.STRING(31), allowNull: false},
    desc: {type: DataTypes.STRING(511), allowNull: false},
    pitch: {type: DataTypes.INTEGER, allowNull:false},
}, { sequelize, modelName: "Plant", createdAt:false, updatedAt:false });

Plant.belongsTo(Nature,{foreignKey:"nature_id", keyType:DataTypes.INTEGER})

sequelize.sync().then().catch(error => {
    console.log(error);
})

module.exports = Plant;