import mongoose from "mongoose";
const billDetailsSchema = new mongoose.Schema({
  billNumber: {
    type: "String",
    required: [true, "Please provide a billNumber"],
  },
  date: { type: "String", required: [true, "Please provide a Date"] },
  customerName: {
    type: "String",
    required: [true, "Please provide a customerName"],
  },
  subTotal: { type: "Number", required: [true, "Please provide a subTotal"] },
  broker: { type: "String" },
});

const billDetail =
  mongoose.models.billDetails ||
  mongoose.model("billDetails", billDetailsSchema);
export default billDetail;
