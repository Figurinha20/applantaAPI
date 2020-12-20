require('dotenv').config()
const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 3000;
const { Sequelize } = require('sequelize');

var natures = require("./routes/natures.router");
var plants = require("./routes/plants.router");
var users = require("./routes/users.router");
var recordings = require("./routes/recordings.router");
var friendships = require("./routes/friendships.router");

app.use(express.json());
app.use("/natures", natures);
app.use("/plants", plants);
app.use("/users", users);
app.use("/recordings", recordings);
app.use("/friendships", friendships);

// SEQUELIZE
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then(function(errors) { 
    if (errors) {
        console.error('Unable to connect to the database:', errors);
    } else {
        console.log('connected to mysql');
    }
 });


app.listen(port, () => {
    console.log("App is running on " + port);
})