const express = require('express');

const Category = require('../model/Category');

const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const categories =  await Category.find();

        return res.send(categories);
    } catch {
        return res.sendStatus(500);
    }
});

module.exports = router;