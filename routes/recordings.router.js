var express = require('express')
var router = express.Router()
var controller = require("../controllers/recordings.controller")
const { validationResult, body, param } = require('express-validator')

router.post('/', [
    body('name').notEmpty().escape(), 
    body('code').notEmpty().escape(), 
    body('plant_id').notEmpty().isNumeric(), 
    body('user_id').notEmpty().isNumeric(),
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.create(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.delete('/:id', [
    param('id').notEmpty().isNumeric() 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.destroy(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

router.put('/:id', [
    param('id').notEmpty().isNumeric(), 
    body('name').notEmpty().escape()
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controller.update(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})

module.exports = router