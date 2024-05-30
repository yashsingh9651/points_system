import { connect } from "@/dbConfig/dbConfig";
import restockBillDetails from "@/models/restockBillDetails";
import restockBillProd from "@/models/restockBillProduct";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
connect();

export async function POST(request) {
  try {
    const { adminEmail, billNumber } = await request.json();
    const admin = await User.findOne({ email: adminEmail });
    if (admin.isAdmin) {
      const details = await restockBillDetails.findOne({ billNumber });
      const products = await restockBillProd.find({ billNumber });
      return NextResponse.json({
        success: true,
        products,
        details,
        message: "Bill Fetched successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Only Admin access is allowed.",
      });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
