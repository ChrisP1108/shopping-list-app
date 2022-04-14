const express = require('express');
const router = express.Router();

const ShoppingList = require('../models/activeShoppingListModel');

const { getLists, getList, getListItems, getListItem } = require('../controllers/template_listController/get');
const { postList, postListItem } = require('../controllers/template_listController/post');
const { putList, putListItem } = require('../controllers/template_listController/put');
const { deleteList, deleteListItems, deleteListItem } = require('../controllers/template_listController/delete');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, (req, res) => getLists(req, res, ShoppingList));

router.get('/:id', protect, (req, res) => getList(req, res, ShoppingList));

router.get('/:id/items', protect, (req, res) => getListItems(req, res, ShoppingList));

router.get('/:id/items/:id', protect, (req, res) => getListItem(req, res, ShoppingList));

router.post('/', protect, (req, res) => postList(req, res, ShoppingList, false));

router.post('/:id', protect, (req, res) => postListItem(req, res, ShoppingList));

router.put('/:id', protect, (req, res) => putList(req, res, ShoppingList));

router.put('/:id/items/:id', protect, (req, res) => putListItem(req, res, ShoppingList));

router.delete('/:id', protect, (req, res) => deleteList(req, res, ShoppingList));

router.delete('/:id/items', protect, (req, res) => deleteListItems(req, res, ShoppingList));

router.delete('/:id/items/:id', protect,(req, res) => deleteListItem(req, res, ShoppingList));

module.exports = router;