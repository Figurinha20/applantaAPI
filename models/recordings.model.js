const sequelize = require("../config/sequelizeInstance").sequelizeInstance;
const { Model, DataTypes } = require('sequelize');
const User = require("./users.model");
const Plant = require("./plants.model");

class Recording extends Model {};

Recording.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(31), allowNull: false},
    code: {type: DataTypes.STRING(255), allowNull: false}
}, { sequelize, modelName: "Recording", createdAt:false, updatedAt:false });

Recording.belongsTo(Plant,{foreignKey:"plant_id", keyType:DataTypes.INTEGER});
Recording.belongsTo(User,{foreignKey:"user_id", keyType:DataTypes.INTEGER});

sequelize.sync().then().catch(error => {
    console.log(error);
})

module.exports = Recording;