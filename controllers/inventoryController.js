import InventoryMovement from "../models/InventoryMovement.js";
import Product from "../models/Product.js";

export const addMovement = async (req, res) => {
  try {
    const { product, quantity, type } = req.body;
    const prod = await Product.findById(product);
    if (!prod) return res.status(400).json({ message: "Producto no válido" });
    const movement = await InventoryMovement.create({
      product,
      quantity,
      type,
      user: req.user._id,
    });
    if (type === "IN") prod.stock += quantity;
    if (type === "OUT") prod.stock -= quantity;

    await prod.save();

    res.status(201).json(movement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
