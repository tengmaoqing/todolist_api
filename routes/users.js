const express = require('express');
const router = express.Router();
const User = require('../controllers/user')

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', User.getUserById);

router.post('/', User.addUser);

module.exports = router;
