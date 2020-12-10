var express = require('express')
var router = express.Router()
var controller = require("../controllers/plants.controller")
const { validationResult, body, param } = require('express-validator')

router.get('/:bt_token', [
    param('bt_token').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.getPlantByBluetooth(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.post('/', [
    body('bt_token').notEmpty().escape(),
    body('name').notEmpty().escape(), 
    body('species').notEmpty().escape(), 
    body('desc').notEmpty().escape(), 
    body('nature_id').notEmpty().isNumeric(),
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.create(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

module.exports = router