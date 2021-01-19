var express = require('express')
var router = express.Router()
var controller = require("../controllers/plants.controller")
const { validationResult, body, param } = require('express-validator')

/**
 * Create a new Plant
 * @route POST /plants
 * @group Plants
 * @param {object} object.body - Plant - eg. {"bt_token": "exampleToken", "name": "Lina", "species": "Rosa", "desc": "Tem espinhos, cuidado!", "nature_id": 1}
 * @returns {object} 200 - New Plant
 * @returns {Error} 400 - Unexpected Error
 */

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

/**
 * Get a Plant
 * @route GET /plants/{bt_token}
 * @group Plants
 * @param {string} bt_token.path - Plant's Bluetooth Token
 * @returns {object} 200 - Found Plant
 * @returns {Error} 400 - Unexpected Error
 */

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

module.exports = router