const express = require('express');
const router = express.Router();
const jwtVerify = require('../config/jwtHelper');
const passport = require('passport');


const ctrlUser = require('../controllers/user.controller');

router.post('/register', ctrlUser.register);

router.post('/login', ctrlUser.authenticate);



router.get('/user-profile', jwtVerify.verifyJwtToken, ctrlUser.userProfile);





module.exports = router;
