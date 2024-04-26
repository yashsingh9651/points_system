import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Transaction from "@/models/transModel";
import User from "@/models/userModel";
connect();

export async function PUT(request) {
  try {
    const { email, _id } = await request.json();
    const admin = await User.findOne({ email });
    if (admin.isAdmin) {
      const transaction = await Transaction.findById(_id);
      if (transaction.status === "pending") {
        transaction.status = "approved";
        transaction.save();
      } else {
        transaction.status = "pending";
        transaction.save();
      }
      return NextResponse.json({
        success: true,
        message: "Transaction Approved Successfully",
      });
    }
    return NextResponse.json({
      success: false,
      message: "Only Admin Access is Allowed",
    });
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    });
  }
}
