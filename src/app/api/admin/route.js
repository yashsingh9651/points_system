import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Transaction from "@/models/transModel";
connect();
// Sending Transactions and Users to the Admin
export async function POST(request) {
  try {
    const { email } = await request.json();
    const admin = await User.findOne({ email });
    if (admin.isAdmin) {
      const users = await User.find({ isAdmin: false }).select('-password');
      users.reverse();
      const transactions = await Transaction.find();
      transactions.reverse();
      return NextResponse.json({
        success: true,
        message: "Users Fetched Successfully",
        users,
        transactions
      });
    }

    return NextResponse.json({
      success: false,
      error: "Only Admin Access is Allowed",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
