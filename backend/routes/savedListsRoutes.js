const express = require('express');
const router = express.Router();

const { getSavedLists, getSavedList, getSavedListItems, getSavedListItem } = require('../controllers/savedListsController/get');
const { postSavedList, postSavedListItem } = require('../controllers/savedListsController/post');
const { putSavedList, putSavedListItem } = require('../controllers/savedListsController/put');
const { deleteSavedList, deleteSavedListItems, deleteSavedListItem } = require('../controllers/savedListsController/delete');

router.get('/', getSavedLists);

router.get('/:id', getSavedList);

router.get('/:id/items', getSavedListItems);

router.get('/:id/items/:id', getSavedListItem);

router.post('/', postSavedList);

router.post('/:id', postSavedListItem);

router.put('/:id', putSavedList);

router.put('/:id/items/:id', putSavedListItem);

router.delete('/:id', deleteSavedList);

router.delete('/:id/items', deleteSavedListItems);

router.delete('/:id/items/:id', deleteSavedListItem);

module.exports = router;