const express = require('express');
const router = express.Router();

const { getActiveList } = require('../controllers/activeShoppingListController/get');
const { postActiveList } = require('../controllers/activeShoppingListController/post');
const { deleteActiveList } = require('../controllers/activeShoppingListController/delete');

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getActiveList); // Get Active List

router.post('/', protect, postActiveList); // Set Active Shopping List

router.delete('/:id', protect, deleteActiveList); // Clear Active Shopping List Item

module.exports = router;