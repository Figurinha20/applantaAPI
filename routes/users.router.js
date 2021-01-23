var express = require('express')
var router = express.Router()
var controller = require("../controllers/users.controller")
const { validationResult, body, param } = require('express-validator')

/**
 * Create a new User
 * @route POST /users
 * @group Users
 * @param {object} object.body - User - eg. {"name": "Rakeesh", "access_token": "12345", "refresh_token": "54321"}
 * @returns {object} 200 - New User
 * @returns {Error} 400 - Unexpected Error
 */

router.post('/', [
    body('name').notEmpty().escape(), 
    body('access_token').notEmpty().escape(), 
    body('refresh_token').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.create(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

/**
 * Get a user
 * @route GET /users/{access_token}
 * @group Users
 * @param {string} access_token.path - User's Access Token
 * @returns {object} 200 - Found User
 * @returns {Error} 400 - Unexpected Error
 */

router.get('/:access_token', [
    param('access_token').notEmpty().escape()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.login(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

/**
 * Get a User's Recordings
 * @route GET /users/{id}/recordings
 * @group Users
 * @param {integer} id.path - User's Id
 * @returns {object} 200 - Recording List
 * @returns {Error} 400 - Unexpected Error
 */
router.get('/:id/recordings', [
    param('id').notEmpty().isNumeric()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getUserRecordings(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

/**
 * Get a User's Friendships
 * @route GET /users/{id}/friendships
 * @group Users
 * @param {integer} id.path - User's Id
 * @returns {object} 200 - Friendship List
 * @returns {Error} 400 - Unexpected Error
 */
router.get('/:id/friendships', [
    param('id').notEmpty().isNumeric()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getUserFriendships(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

/**
 * Update a User's Exp
 * @route PUT /users/{id}
 * @group Users
 * @param {integer} id.path - User's Id
 * @param {object} exp.body - User's Exp Value - eg. {"exp": 50}
 * @returns {object} 200 - Updated
 * @returns {Error} 400 - Unexpected Error
 */
router.put('/:id', [
    param('id').notEmpty().isNumeric(),
    body('exp').notEmpty().isNumeric()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.update(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

module.exports = router