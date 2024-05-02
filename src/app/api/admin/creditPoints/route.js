import { connect } from "@/dbConfig/dbConfig";
import Transaction from "@/models/transModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
connect();

export async function POST(request) {
  try {
    const { adminEmail, email, amount, username } = await request.json();
    const admin = await User.findOne({ email: adminEmail });
    if (admin.isAdmin) {
      const newTransaction = new Transaction({
        email,
        type: "CREDIT",
        amount,
        username,
        status: "approved",
      });
      const user = await User.findOne({ email });
      user.points += amount;
      await user.save();
      await newTransaction.save();
      return NextResponse.json({
        success: true,
        message: "Points Added to User's Account Successfully",
      });
    }
    return NextResponse.json({
      success: false,
      error: "Only Admin access is allowed",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
