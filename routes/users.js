const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')
router.get('/', userController.index)
router.get('/profile', userController.profile)

router.get('/*', userController.error)

module.exports = router

