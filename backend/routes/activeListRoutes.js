const express = require('express');
const router = express.Router();

const { getActiveLists, getActiveList, getActiveListItems, getActiveListItem } = require('../controllers/activeListController/get');
const { postActiveList, postActiveListItem } = require('../controllers/activeListController/post');
const { putActiveList, putActiveListItem } = require('../controllers/activeListController/put');
const { deleteActiveList, deleteActiveListItems, deleteActiveListItem } = require('../controllers/activeListController/delete');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getActiveLists);

router.get('/:id', protect, getActiveList);

router.get('/:id/items', protect, getActiveListItems);

router.get('/:id/items/:id', protect, getActiveListItem);

router.post('/', protect, postActiveList);

router.post('/:id', protect, postActiveListItem);

router.put('/:id', protect, putActiveList);

router.put('/:id/items/:id', protect, putActiveListItem);

router.delete('/:id', protect, deleteActiveList);

router.delete('/:id/items', protect, deleteActiveListItems);

router.delete('/:id/items/:id', protect, deleteActiveListItem);

module.exports = router;