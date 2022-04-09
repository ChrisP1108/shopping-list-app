const express = require('express');
const router = express.Router();

const { getSavedLists, getSavedList } = require('../controllers/savedListController/get');
const { postSavedList } = require('../controllers/savedListController/post');
const { putSavedList } = require('../controllers/savedListController/put');
const { deleteSavedList } = require('../controllers/savedListController/delete');

router.get('/', getSavedLists);

router.get('/:id', getSavedList);

router.post('/', postSavedList);

router.put('/:id', putSavedList);

router.delete('/:id', deleteSavedList);

module.exports = router;