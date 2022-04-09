const express = require('express');
const router = express.Router();

const { getActiveLists, getActiveList } = require('../controllers/activeListController/get');
const { postActiveList } = require('../controllers/activeListController/post');
const { putActiveList } = require('../controllers/activeListController/put');
const { patchActiveList } = require('../controllers/activeListController/patch');
const { deleteActiveList } = require('../controllers/activeListController/delete');

router.get('/', getActiveLists);

router.get('/:id', getActiveList);

router.post('/', postActiveList);

router.put('/:id', putActiveList);

router.patch('/:id', patchActiveList);

router.delete('/:id', deleteActiveList);

module.exports = router;