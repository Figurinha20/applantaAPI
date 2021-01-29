const Recording = require("../models/recordings.model"); 

//create a new Recording
const create = (req, res) => {
    Recording.create({
        name: req.body.name,
        code: req.body.code,
        plant_id: req.body.plant_id,
        user_id: req.body.user_id,
    }).then(newRecording => {
        res.status(200).json(newRecording); 
    }).catch(error => {
        res.status(400).send(error); 
    })
} 

//delete a Recording
const destroy = (req, res) => {
    Recording.destroy({
        where: {
            id: req.params.id
        }
    }).then(destroyedRecording => {
        if (destroyedRecording){
            res.status(200).json({
                message:"Recording Removed Successfully", 
                destroyed: destroyedRecording
            }); 
        }
        else {res.status(404).json({
            message:"Recording Not Found", 
            destroyed: destroyedRecording
        })}
    }).catch(error => {
        res.status(400).send(error); 
    })
}

//update a Recording's name
const update = (req, res) => {
    Recording.update({
        name: req.body.name
    },
        {
            where: {
                id: req.params.id
        }
    }).then(updatedRecording => {
        if (updatedRecording[0]){
            res.status(200).json({
                message: "Nome alterado!",
                updatedRecording: updatedRecording[0],
                updated: updatedRecording[1]
            }); 
        }
        else {res.status(200).json({
            message: "Nome sem alterações :/",
            updatedRecording: updatedRecording[0],
            updated: updatedRecording[1]
        })}
    }).catch(error => {
        res.status(400).send(error); 
    })
}

exports.create = create; 
exports.destroy = destroy;
exports.update = update;