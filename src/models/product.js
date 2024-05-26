import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name"] },
  quantity: { type: Number, required: [true, "Please provide a quantity"] },
  buyPrice: { type: Number, required: [true, "Please provide a Buying price"] },
  sellPrice: { type: Number, required: [true, "Please provide a Selling price"] },
  MRP: { type: Number, required: [true, "Please provide MRP"] },
  discount: { type: Number, required: [true, "Please provide MRP"] },
});
const Product =
  mongoose.models.products || mongoose.model("products", productSchema);
export default Product;
