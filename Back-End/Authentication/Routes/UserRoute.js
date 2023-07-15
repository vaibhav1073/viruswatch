const express = require('express');
const { RegisterUser, LoginUser, GetUser, UpdatePassword, UpdateProfile } = require('../Controllers/UserControllers');
const {ResetPassword,ForgetPassword}= require("../Auth/sendmail");
const { authorize } = require('../Auth/UserAuth');
const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/user/:email', authorize, GetUser);
router.post('/updateprofile', authorize, UpdateProfile);
router.post('/updatepassword', authorize, UpdatePassword);
router.post('/forget',ForgetPassword);
router.post('/resetpassword/:token', ResetPassword);


module.exports = router;