var express = require('express')
var router = express.Router()
var controller = require("../controllers/friendships.controller")
const { validationResult, body, param } = require('express-validator')

/** 
* Create a friendship or increase it's level if it exists
* @route PUT /friendships/users/{user_id}/plants/{plant_id}
* @group Friendships
* @param {integer} user_id.path - User's Id
* @param {integer} plant_id.path - Plant's Id
* @returns {object} 200 - newFriendship
* @returns {Error} 400 - Unexpected Error
*/

router.put('/users/:user_id/plants/:plant_id', [
    param('user_id').notEmpty().isNumeric(),
    param('plant_id').notEmpty().isNumeric()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.updateOrcreate(req, res);
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

/** 
* Update a Friendships Photo
* @route PUT /friendships/users/{user_id}/plants/{plant_id}/addPhoto
* @group Friendships
* @param {integer} user_id.path - User's Id
* @param {integer} plant_id.path - Plant's Id
* @returns {object} 200 - updatedFriendship
* @returns {Error} 400 - Unexpected Error
*/

router.put('/users/:user_id/plants/:plant_id/addPhoto', [
    param('user_id').notEmpty().isNumeric(),
    param('plant_id').notEmpty().isNumeric(),
    body('photo').notEmpty().escape()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.addPhoto(req, res);
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

module.exports = router