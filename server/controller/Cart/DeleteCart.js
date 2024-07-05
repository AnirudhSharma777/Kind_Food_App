const Cart = require('../../models/cart');

require("dotenv").config()

exports.DeleteCart = async (req, res) => {
  try {
    const id = req.params.id;
    await Cart.findByIdAndRemove(id);
    return res.status(204).json({ message: "Cart deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting cart" });
  }
};
