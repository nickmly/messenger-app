var express = require('express');
var User = require('../helpers/user');
var router = express.Router();

//Debug
User.clearDb();
User.createDummy();

// api/users
router.get('/', User.showAll);
router.get('/me', User.getUser);
router.post('/register', User.register);

router.post('/login', User.login);

module.exports = router;