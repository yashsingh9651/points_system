import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name"] },
  quantity: { type: Number, required: [true, "Please provide a quantity"] },
  price: { type: Number, required: [true, "Please provide a price"] },
});
const Product =
  mongoose.models.products || mongoose.model("products", productSchema);
export default Product;
