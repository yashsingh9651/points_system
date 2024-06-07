import mongoose from "mongoose";
const restockBillProdSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please provide a name"] },
  quantity: { type: Number, required: [true, "Please provide a quantity"] },
  sellPrice: { type: Number, required: [true, "Please provide a price"] },
  buyPrice: { type: Number, required: [true, "Please provide a price"] },
  MRP: { type: Number, required: [true, "Please provide a price"] },
  discount: { type: Number, required: [true, "Please provide a price"] },
  billNumber: { type: String, required: [true, "Please provide a billNumber"] },
});
const restockBillProd =
  mongoose.models.restockbillprods ||
  mongoose.model("restockbillprods", restockBillProdSchema);
export default restockBillProd;
