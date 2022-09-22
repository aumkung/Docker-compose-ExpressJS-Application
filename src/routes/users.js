const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { UserResourceController } = require('../controllers')

router.get('/', UserResourceController.index);
router.get('/lists', UserResourceController.list);
router.post('/upload', upload.single('media'), UserResourceController.upload)

module.exports = router;
