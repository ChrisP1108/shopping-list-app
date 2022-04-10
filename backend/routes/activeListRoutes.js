const express = require('express');
const router = express.Router();

const { getActiveLists, getActiveList, getActiveListItems, getActiveListItem } = require('../controllers/activeListController/get');
const { postActiveList, postActiveListItem } = require('../controllers/activeListController/post');
const { putActiveList, putActiveListItem } = require('../controllers/activeListController/put');
const { deleteActiveList, deleteActiveListItems, deleteActiveListItem } = require('../controllers/activeListController/delete');

router.get('/', getActiveLists);

router.get('/:id', getActiveList);

router.get('/:id/items', getActiveListItems);

router.get('/:id/items/:id', getActiveListItem);

router.post('/', postActiveList);

router.post('/:id', postActiveListItem);

router.put('/:id', putActiveList);

router.put('/:id/items/:id', putActiveListItem);

router.delete('/:id', deleteActiveList);

router.delete('/:id/items', deleteActiveListItems);

router.delete('/:id/items/:id', deleteActiveListItem);

module.exports = router;