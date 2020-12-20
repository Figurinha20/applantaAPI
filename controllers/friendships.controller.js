const Friendship = require("../models/friendships.model");

//creates a friendship if it doesn't exist, if it does increases the level by 1
const updateOrcreate = (req, res) => {
    Friendship.findOrCreate({
        where: {
            user_id: req.params.user_id,
            plant_id: req.params.plant_id
        },
        defaults: {
            user_id: req.params.user_id,
            plant_id: req.params.plant_id,
            friend_lvl: 1,
            photo: null
        }
    }).then(newFriendship => {
        if (newFriendship[1]){
            res.status(200).json({newFriendship}); 
        }
        else {
            newFriendship[0].friend_lvl++;
            newFriendship[0].save();
            res.status(200).json(newFriendship)
        }
    }).catch(error => {
        res.status(400).send(error); 
    })
}

const addPhoto = (req, res) => {
    Friendship.update({photo: req.body.photo}, {
        where: {
            user_id:req.params.user_id,
            plant_id:req.params.plant_id
        }
    }).then(updatedFriendship => {
        res.status(200).json(updatedFriendship)
    }).catch(error => {
        res.status(400).send(error); 
    })
}

exports.updateOrcreate = updateOrcreate;
exports.addPhoto = addPhoto;