const Plant = require("../models/plants.model"); 
const Nature = require("../models/natures.model");

//create a new plant
const create = (req, res) => {
    Plant.create({
        bt_token: req.body.bt_token,
        name: req.body.name,
        species: req.body.species,
        desc: req.body.desc,
        nature_id: req.body.nature_id,
        pitch: Math.floor(Math.random() * 10) + 1
    }).then(newPlant => {
        res.status(200).json(newPlant); 
    }).catch(error => {
        res.status(400).send(error); 
    })
} 

//get a plant by using it's bluetooth token
const getPlantByBluetooth = (req, res) => {
    Plant.findOne({
        attributes:["id", "name", "species", "desc", "pitch"],
        where: {bt_token: req.params.bt_token},
        include: Nature
    }).then(plant => {
        res.status(200).json(plant); 
    }).catch(error => {
        res.status(400).send(error); 
    })
}

exports.create = create; 
exports.getPlantByBluetooth = getPlantByBluetooth;