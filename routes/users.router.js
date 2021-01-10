var express = require('express')
var router = express.Router()
var controller = require("../controllers/users.controller")
const { validationResult, body, param } = require('express-validator')

//register user
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

//login user: get user info trough access_token
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

//get user recordings trough user's id
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

//get user friendships trough user's id
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