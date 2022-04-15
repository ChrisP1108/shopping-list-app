const express = require('express');
const router = express.Router();

const { getActiveList } = require('../controllers/activeShoppingListController/get');
const { postActiveList } = require('../controllers/activeShoppingListController/post');
const { deleteActiveList } = require('../controllers/activeShoppingListController/delete');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getActiveList);

router.post('/', protect, postActiveList);

router.delete('/:id', protect, deleteActiveList);

module.exports = router;