const express = require('express');
const router = express.Router();

const { getLists, getList, getListItems, getListItem } = require('../controllers/savedShoppingListController/get');
const { postList, postListItem } = require('../controllers/savedShoppingListController/post');
const { putList, putListItem } = require('../controllers/savedShoppingListController/put');
const { deleteAllLists, deleteList, deleteListItems, deleteListItem } = require('../controllers/savedShoppingListController/delete');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getLists);

router.get('/:id', protect, getList);

router.get('/:id/items', protect, getListItems);

router.get('/:id/items/:id', protect, getListItem);

router.post('/', protect, postList);

router.post('/:id/items', protect, postListItem);

router.put('/:id', protect, putList);

router.put('/:id/items/:id', protect, putListItem);

router.delete('/', protect, deleteAllLists);

router.delete('/:id', protect, deleteList);

router.delete('/:id/items', protect, deleteListItems);

router.delete('/:id/items/:id', protect, deleteListItem);

module.exports = router;