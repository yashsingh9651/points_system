import mongoose from "mongoose";
const newBillProdSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name"] },
  quantity: { type: Number, required: [true, "Please provide a quantity"] },
  price: { type: Number, required: [true, "Please provide a price"] },
  billNumber: { type: String, required: [true, "Please provide a billNumber"] },
});
const newBillProd =
  mongoose.models.newBillProds ||
  mongoose.model("newBillProds", newBillProdSchema);
export default newBillProd;
