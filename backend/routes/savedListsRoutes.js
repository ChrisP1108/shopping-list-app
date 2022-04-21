const express = require('express');
const router = express.Router();

const { getLists, getList, getListItems, getListItem } = require('../controllers/savedShoppingListController/get');
const { postList, postListItems  } = require('../controllers/savedShoppingListController/post');
const { putList, putListItems, putListItem } = require('../controllers/savedShoppingListController/put');
const { deleteLists, deleteList, deleteListItems, deleteListItem } = require('../controllers/savedShoppingListController/delete');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getLists); // Get All Shopping Lists

router.get('/:id', protect, getList); // Get Shopping List By ID

router.get('/:id/items', protect, getListItems); // Get Shopping List Items

router.get('/:id/items/:id', protect, getListItem); // Get Shopping List Item By ID

router.post('/', protect, postList); // Add Shopping List

router.post('/:id/items', protect, postListItems); // Add Shopping List Items

router.put('/:id', protect, putList); // Update Shopping List Name By ID

router.put('/:id/items', protect, putListItems); // Update Shopping List Items

router.put('/:id/items/:id', protect, putListItem); // Update Shopping List Item By ID

router.delete('/', protect, deleteLists); // Delete Shopping Lists

router.delete('/:id', protect, deleteList); // Delete Shopping List Or Item By ID

router.delete('/:id/items', protect, deleteListItems); // Delete Shopping List Items

router.delete('/:id/items/:id', protect, deleteListItem); // Delete Shopping List Item By ID

module.exports = router;