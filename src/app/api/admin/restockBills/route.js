import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import restockBillDetails from "@/models/restockBillDetails";
connect();

export async function POST(request) {
  try {
    const { adminEmail } = await request.json();
    const admin = await User.findOne({ email: adminEmail });
    if (admin.isAdmin) {
      const bills = await restockBillDetails.find();
      bills.reverse();
      return NextResponse.json({
        message: "Bills Fetched Successfully",
        success: true,
        bills,
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
