const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login);

module.exports = router;
