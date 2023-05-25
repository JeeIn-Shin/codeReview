const express = require('express');
const router = express.Router();

// http://localhost:8080
router.get('/', async(req, res) => {
    res.render('main/index.html');
})

module.exports = router;