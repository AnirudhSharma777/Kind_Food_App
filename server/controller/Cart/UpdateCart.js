const Cart = require('../../models/cart');

require("dotenv").config();

exports.UpdateCart = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, price, description, genes, image, ingredients } = req.body;
      const cart = await Cart.findByIdAndUpdate(id, {
        name,
        price,
        description,
        genes,
        image,
        ingredients,
      }, { new: true });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      } else {
        return res.status(200).json({
            message: 'Cart updated successfully',
            cart,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating cart' });
    }
  };