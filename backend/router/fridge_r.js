const express = require('express');
const router = express.Router();
const fridgeController = require('../controller/fridge_c');

router.post('/addItem', fridgeController.addItem);

router.post('/deleteItem/:id', fridgeController.deleteItem);

router.get('/getData', fridgeController.getData);

module.exports = router;
