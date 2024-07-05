const Cart = require('../../models/cart');

require("dotenv").config();

exports.CreateCart = async (req, res) => {
    try {
      const { name, price, description, genes, image, ingredients } = req.body;
      const cart = new Cart({
        name,
        price,
        description,
        genes,
        image,
        ingredients,
      });
      await cart.save();
      return res.status(200).json({
        message: "Cart created successfully",
        cart,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating cart' });
    }
  };