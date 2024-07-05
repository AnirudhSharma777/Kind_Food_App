const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true,
  },
  price: {
    type:Number,
    required:true,
  },
  description:{
    type: String,
    required:true,
  },
  genes: [{ type: String }],
  image: {
    type:String,
    required:true,
  },
  ingredients: [{ type:String }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;