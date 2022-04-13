const express = require('express');
const router = express.Router();

const { getSavedLists, getSavedList, getSavedListItems, getSavedListItem } = require('../controllers/savedListsController/get');
const { postSavedList, postSavedListItem } = require('../controllers/savedListsController/post');
const { putSavedList, putSavedListItem } = require('../controllers/savedListsController/put');
const { deleteSavedList, deleteSavedListItems, deleteSavedListItem } = require('../controllers/savedListsController/delete');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getSavedLists);

router.get('/:id', protect, getSavedList);

router.get('/:id/items', protect, getSavedListItems);

router.get('/:id/items/:id', protect, getSavedListItem);

router.post('/', protect, postSavedList);

router.post('/:id', protect, postSavedListItem);

router.put('/:id', protect, putSavedList);

router.put('/:id/items/:id', protect, putSavedListItem);

router.delete('/:id', protect, deleteSavedList);

router.delete('/:id/items', protect, deleteSavedListItems);

router.delete('/:id/items/:id', protect, deleteSavedListItem);

module.exports = router;