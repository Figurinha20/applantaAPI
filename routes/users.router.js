var express = require('express')
var router = express.Router()
var controller = require("../controllers/users.controller")
const { validationResult, body, param } = require('express-validator')

router.post('/', [
    body('name').notEmpty().escape(), 
    body('access_token').notEmpty().escape(), 
    body('refresh_token').notEmpty().escape(), 
    body('age').notEmpty().isNumeric(),
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.create(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

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

module.exports = router