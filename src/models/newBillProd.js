import mongoose from "mongoose";
const newBillProdSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name"] },
  quantity: { type: Number, required: [true, "Please provide a quantity"] },
  sellPrice: { type: Number, required: [true, "Please provide a price"] },
  billNumber: { type: String, required: [true, "Please provide a billNumber"] },
});
const newBillProd =
  mongoose.models.newbillprods ||
  mongoose.model("newbillprods", newBillProdSchema);
export default newBillProd;
