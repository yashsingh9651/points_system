import mongoose from "mongoose";
const transSchema = new mongoose.Schema({
  email: { type: String, required: [true, "Please provide an email"] },
  shopName: { type: String, required: [true, "Please provide shop name"] },
  amount: {
    type: Number,
    required: [true, "Please provide an amount"],
  },
  status: {
    type: String,
    default: "pending",
  },
  type: { type: String, required: [true, "Please provide an type"] },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const Transaction =
  mongoose.models.transactions || mongoose.model("transactions", transSchema);
export default Transaction;
