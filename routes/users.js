const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userController = require('../controllers/users');

router.route('/')
    .get(userController.index)
    .post(userController.store);

router.route('/:id')
    .get(userController.show)
    .patch(userController.update)
    .delete(userController.destroy);

/* create picture related to users */
router.route('/:id/pictures').post(userController.storeNewPicture);


module.exports = router;