const User = require("../models/users.model");
const Recording = require("../models/recordings.model");
const Plant = require("../models/plants.model");
const Nature = require("../models/natures.model");

//create a new User
const create = (req, res) => {
    User.create({
        name: req.body.name,
        access_token: req.body.access_token,
        refresh_token: req.body.refresh_token,
        exp: 0,
        admin: false
    }).then(newUser => {
        res.status(200).json(newUser); 
    }).catch(error => {
        res.status(400).send(error); 
    })
}

//get all the recordings of a user
const getUserRecordings = (req, res) => {
    Recording.findAll({
        attributes:["id", "name", "code"],
        where: {user_id: req.params.id},
        include: {model: Plant, attributes:["name", "species", "desc", "nature_id"]}
    }).then(recordingList => {
        res.status(200).json(recordingList); 
    }).catch(error => {
        res.status(400).send(error); 
    })
}

//login the user trough their access_token
const login = (req, res) => {
    User.findOne({
        attributes:["id", "name", "exp", "admin"],
        where: {access_token: req.params.access_token}
    }).then(user => {
        res.status(200).json(user);
    }).catch(error => {
        res.status(400).send(error)
    })
}


//falta a parte dos logins, access_token e refresh_token mas como nunca usei o google fica assim por agora

exports.create = create; 
exports.getUserRecordings = getUserRecordings;
exports.login = login;