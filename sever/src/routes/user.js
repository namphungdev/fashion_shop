const express = require('express');
const router = express.Router();

const UserController = require('../controller/userController.js');

router.get('/', UserController.getAllUser);
router.post('/get_user', UserController.getUser);
router.post('/', UserController.createUser);
router.post('/login', UserController.postLogin);
router.post('/logout', UserController.postLogout);
router.post('/register', UserController.postRegister);

module.exports = router;