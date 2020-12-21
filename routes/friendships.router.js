var express = require('express')
var router = express.Router()
var controller = require("../controllers/friendships.controller")
const { validationResult, body, param } = require('express-validator')

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