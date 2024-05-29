import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Product from "@/models/product";
import restockBillDetails from "@/models/restockBillDetails";
import restockBillProd from "@/models/restockBillProduct";
connect();
// Updating Inventory products with bulk method
async function updateProductQuantities(billProdList) {
  const bulkOperations = billProdList.map((item) => {
    return {
      updateOne: {
        filter: { name: item.name },
        update: {
          $inc: { quantity: item.quantity },
          $set: {
            buyPrice: item.buyPrice,
            sellPrice: item.sellPrice,
            MRP: item.MRP,
            discount: item.discount,
          },
        },
      },
    };
  });
  await Product.bulkWrite(bulkOperations);
}
export async function POST(request) {
  try {
    const { adminEmail, billProdList, date, subTotal, senderName, billNumber } =
      await request.json();
    const admin = await User.findOne({ email: adminEmail });
    if (admin.isAdmin) {
      const newBill = new restockBillDetails({
        date,
        subTotal,
        billNumber,
        senderName,
      });
      await restockBillProd.insertMany(billProdList);
      await updateProductQuantities(billProdList);
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
