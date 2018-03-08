var express = require('express');
var router = express.Router();

var Message = require('../helpers/message');

// api/messages
router.get('/', Message.getMessages);
router.post('/', Message.createMessage);

module.exports = router;