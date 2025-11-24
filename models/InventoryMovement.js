import mongoose from "mongoose";

const inventoryMovementSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true },
    type: { type: String, enum: ["IN", "OUT"], required: true }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const InventoryMovement = mongoose.model(
  "InventoryMovement",
  inventoryMovementSchema
);
export default InventoryMovement;
