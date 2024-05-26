import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import newBillProd from "@/models/newBillProd";
import billDetails from "@/models/billlDetails";
import Product from "@/models/product";
connect();

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
