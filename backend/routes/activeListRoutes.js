const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ msg: 'Get Active Shopping Lists'})
});

module.exports = router;