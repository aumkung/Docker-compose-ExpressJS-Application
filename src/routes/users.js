const express = require('express');
const router = express.Router();
const { UserResourceController } = require('../controllers')

router.get('/', UserResourceController.index);
router.get('/lists', UserResourceController.list);

module.exports = router;
