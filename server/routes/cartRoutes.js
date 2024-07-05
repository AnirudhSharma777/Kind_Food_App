const express = require('express');
const router = express.Router();
const { CreateCart }= require('../controller/Cart/CreateCart');
const { DeleteCart }= require('../controller/Cart/DeleteCart');
const { UpdateCart }= require('../controller/Cart/UpdateCart');
const { GetCart }= require('../controller/Cart/GetCart');



router.post('/createcart', CreateCart);
router.delete('/deletecart', DeleteCart);
router.put('/updatecart',UpdateCart);
router.get('/getcart', GetCart);

module.exports = router;