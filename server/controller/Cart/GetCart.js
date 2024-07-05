const Cart = require('../../models/cart');

require("dotenv").config();


exports.GetCart = async (req, res) => {
    try {
      const id = req.params.id;
      const cart = await Cart.findById(id).populate('genes ingredients');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      } else {
        return res.status(200).json({
            cart,
            message:"All carts are fetched"
          });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error getting cart' });
    }
  };