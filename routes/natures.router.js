var express = require('express')
var router = express.Router()
var controller = require("../controllers/natures.controller")
const { validationResult, body, param } = require('express-validator')

/**
 * Create a new Nature
 * @route POST /natures
 * @group Natures
 * @param {object} object.body - Nature - eg. {"desc": "Calma"}
 * @returns {object} 200 - message, newNature and created (boolean)
 * @returns {Error} 400 - Unexpected Error
 * @returns {object} 409 - message, newNature and created (boolean)
 */

router.post('/', [
    body('desc').notEmpty().escape(), 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.create(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

/**
 * Get all Natures
 * @route GET /natures
 * @group Natures
 * @returns {object} 200 - Nature List
 * @returns {Error} 400 - Unexpected Error
 */

router.get('/',  function (req, res) {
    controller.list(res); 
})

module.exports = router