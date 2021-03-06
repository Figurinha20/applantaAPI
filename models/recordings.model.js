const sequelize = require("../config/sequelizeInstance").sequelizeInstance;
const { Model, DataTypes } = require('sequelize');
const User = require("./users.model");
const Plant = require("./plants.model");

class Recording extends Model {};

/**
 * @typedef Recording
 * @property {integer} id.required - Auto Increments
 * @property {string} name.required 
 * @property {text} code.required
 * @property {integer} plant_id.required
 * @property {integer} user_id.required
 */

Recording.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(31), allowNull: false},
    code: {type: DataTypes.TEXT, allowNull: false}
}, { sequelize, modelName: "Recording", createdAt:false, updatedAt:false });

Recording.belongsTo(Plant,{foreignKey:"plant_id", keyType:DataTypes.INTEGER});
Recording.belongsTo(User,{foreignKey:"user_id", keyType:DataTypes.INTEGER});

sequelize.sync().then().catch(error => {
    console.log(error);
})

module.exports = Recording;