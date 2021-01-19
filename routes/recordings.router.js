var express = require('express')
var router = express.Router()
var controller = require("../controllers/recordings.controller")
const { validationResult, body, param } = require('express-validator')

/**
 * Create a new Recording
 * @route POST /recordings
 * @group Recordings
 * @param {object} object.body - Recording - eg. {"name": "SonataVerde", "code": "exampleSongCode", "plant_id": 1, "user_id": 1}
 * @returns {object} 200 - New Recording
 * @returns {Error} 400 - Unexpected Error
 */

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

/**
 * Update a Recording's Name
 * @route PUT /recordings/{id}
 * @group Recordings
 * @param {integer} id.path - Recordings's Id
 * @param {object} name.body - Recording's New Name - eg. {"name": "Edited Name"}
 * @returns {object} 200 - message and updatedRecording
 * @returns {Error} 400 - Unexpected Error
 */

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

/**
 * Delete a Recording
 * @route DELETE /recordings/{id}
 * @group Recordings
 * @param {integer} id.path - Recordings's Id
 * @returns {object} 200 - message and destroyed
 * @returns {Error} 400 - Unexpected Error
 * @returns {object} 404 - message and destroyed
 */

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

module.exports = router