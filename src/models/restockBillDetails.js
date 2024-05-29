import mongoose from "mongoose";
const restockBillDetailsSchema = new mongoose.Schema({
  billNumber: {
    type: "String",
    required: [true, "Please provide a billNumber"],
  },
  date: { type: "String", required: [true, "Please provide a Date"] },
  senderName: {
    type: "String",
    required: [true, "Please provide a Sender Name"],
  },
  subTotal: { type: "Number", required: [true, "Please provide a subTotal"] },
});

const restockBillDetails =
  mongoose.models.restockBillDetails ||
  mongoose.model("restockBillDetails", restockBillDetailsSchema);
export default restockBillDetails;
