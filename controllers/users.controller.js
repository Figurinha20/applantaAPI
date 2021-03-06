const User = require("../models/users.model");
const Recording = require("../models/recordings.model");
const Plant = require("../models/plants.model");
const Nature = require("../models/natures.model");
const Friendship = require("../models/friendships.model");


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
        include: {model: Plant, attributes:["name", "pitch"]}
    }).then(recordingList => {
        res.status(200).json(recordingList); 
    }).catch(error => {
        res.status(400).send(error); 
    })
}

//get all the friends of a user
const getUserFriendships = (req, res) => {
    Friendship.findAll({
        attributes:["friend_lvl", "photo"],
        where: {user_id: req.params.id},
        include : [
            { 
              model: Plant, 
              required: true,
              attributes: ["name", "species", "desc"],
              include: [{model: Nature, required: true, attributes: ["desc"]}]}
          ]
    }).then(friendshipList => {
        res.status(200).json(friendshipList); 
    }).catch(error => {
        res.status(400).send(error); 
    })
}

//login the user trough their access_token (async porque faço duas queries e a segunda precisa de um dado da primeira)
const login = async (req, res) => {
    try {
        let user = await User.findOne({
        attributes:["id", "name", "exp", "admin"],
        where: {access_token: req.params.access_token}
    });
    if (user){
    const friendshipCount = await Friendship.count({
            where: {user_id: user.id}
        });
        user.setDataValue("friendshipCount", friendshipCount)
        user.setDataValue("userExists", true)
        res.status(200).json(user);
    }
    else{
        res.status(200).json({"userExists": false})
    }
    
    } catch (error) {
        res.status(400).send(error);
    }
}

//update the user's exp
const update = (req, res) => {
    User.update({
        exp: req.body.exp
    },
    {where: {id: req.params.id}}
    ).then(updatedUser =>{
        res.status(200).json({"updated": updatedUser[0]});
    }).catch(error => {
        res.status(400).send(error);
    })
}

exports.create = create; 
exports.getUserRecordings = getUserRecordings;
exports.getUserFriendships = getUserFriendships;
exports.login = login;
exports.update = update;