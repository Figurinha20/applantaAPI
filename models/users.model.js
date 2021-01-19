const sequelize = require("../config/sequelizeInstance").sequelizeInstance;
const { Model, DataTypes } = require('sequelize');

class User extends Model {};

/**
 * @typedef User
 * @property {integer} id.required - Auto Increments
 * @property {string} name.required 
 * @property {string} access_token.required - Unique
 * @property {string} refresh_token.required 
 * @property {integer} exp.required
 * @property {boolean} admin.required
 */

User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(31), allowNull: false},
    access_token: {type: DataTypes.STRING, allowNull: false, unique: true},
    refresh_token: {type: DataTypes.STRING, allowNull: false},
    exp: {type: DataTypes.INTEGER},
    admin: {type: DataTypes.BOOLEAN, allowNull: false},
}, { sequelize, modelName: "User", createdAt:false, updatedAt:false });

sequelize.sync().then().catch(error => {
    console.log(error);
})

module.exports = User;