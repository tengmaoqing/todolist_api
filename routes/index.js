const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const { login, registry } = require('../controllers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({
    min: 6,
    max: 20
  })
], login);
router.post('/registry', [
  body('email').isEmail(),
  body('password').isLength({
    min: 6,
    max: 20
  })
], registry)

module.exports = router;
