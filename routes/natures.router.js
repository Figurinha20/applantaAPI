var express = require('express')
var router = express.Router()
var controller = require("../controllers/natures.controller")
const { validationResult, body, param } = require('express-validator')

router.get('/',  function (req, res) {
    controller.list(res); 
})

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

module.exports = router