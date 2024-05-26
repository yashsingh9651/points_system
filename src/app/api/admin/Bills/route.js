import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
connect();

export default async function POST(request) {
  try {
    const { adminEmail } = await request.json();
    const admin = await User.findOne({ email: adminEmail });
    if (admin.isAdmin) {
      await newBillProd.insertMany(billProdList);
      return NextResponse.json({
        message: "Bill Generated Successfully",
        success: true,
      });
    }
    return NextResponse.json({
      message: "Only Admin is allowed",
      success: false,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message, success: false });
  }
}
