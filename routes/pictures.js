const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const pictureController = require('../controllers/pictures');

router.route('/').get(pictureController.index);

router.route('/:id')
    .get(pictureController.show)
    .patch(pictureController.update)
    .delete(pictureController.destroy);


module.exports = router;