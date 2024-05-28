import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import newBillProd from "@/models/newBillProd";
import billDetails from "@/models/billlDetails";
import Product from "@/models/product";
import Transaction from "@/models/transModel";
import { sendMail } from "@/helpers/mailer";
connect();
// Updating Inventory products with bulk method
async function updateProductQuantities(billProdList) {
  const bulkOperations = billProdList.map((item) => {
    return {
      updateOne: {
        filter: { name: item.name },
        update: { $inc: { quantity: -item.quantity } },
      },
    };
  });
  await Product.bulkWrite(bulkOperations);
}
export async function POST(request) {
  try {
    const {
      adminEmail,
      billProdList,
      date,
      subTotal,
      customerName,
      broker,
      billNumber,
    } = await request.json();
    const admin = await User.findOne({ email: adminEmail });
    if (admin.isAdmin) {
      await newBillProd.insertMany(billProdList);
      await updateProductQuantities(billProdList);
      const newBill = new billDetails({
        date,
        subTotal,
        billNumber,
        customerName,
        broker,
      });
      await newBill.save();
      // UPDATING POINTS AND SENDING MAIL TO BROKER
      if (broker) {
        const userBroker = await User.findOne({ email: broker });
        const creditPoints = (subTotal / 100) * 2;
        userBroker.points += creditPoints;
        await userBroker.save();
        const newTransaction = new Transaction({
          email: broker,
          type: "CREDIT",
          amount: creditPoints,
          username: userBroker.username,
          status: "approved",
        });
        await newTransaction.save();
        await sendMail({
          email: broker,
          emailType: "CREDIT",
          amount: creditPoints,
          name: userBroker.username,
        });
      }
      return NextResponse.json({
        message: "Bill Generated Successfully",
        success: true,
      });
    } else {
      return NextResponse.json({
        message: "Only Admin is allowed",
        success: false,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
