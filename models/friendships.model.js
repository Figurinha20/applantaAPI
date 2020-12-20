const sequelize = require("../config/sequelizeInstance").sequelizeInstance;
const { Model, DataTypes } = require('sequelize');
const User = require("./users.model");
const Plant = require("./plants.model");

class Friendship extends Model {};

Friendship.init({
    friend_lvl: {type: DataTypes.INTEGER(5), allowNull: false},
    photo: {type: DataTypes.STRING(255)}
}, { sequelize, modelName: "Friendship", createdAt:false, updatedAt:false });

Plant.belongsToMany(User,{through: Friendship, foreignKey:"plant_id", keyType:DataTypes.INTEGER, primaryKey: true});
User.belongsToMany(Plant,{through: Friendship, foreignKey:"user_id", keyType:DataTypes.INTEGER, primaryKey: true});

sequelize.sync().then().catch(error => {
    console.log(error);
})

module.exports = Friendship;