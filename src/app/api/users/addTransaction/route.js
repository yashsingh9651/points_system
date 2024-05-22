import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Transaction from "@/models/transModel";
import User from "@/models/userModel";
connect();

export async function POST(request) {
  try {
    const { email, amount, type,username } = await request.json();
    const user = await User.findOne({ email }).select("-password");
    const newTransaction = new Transaction({
      email,
      type,
      username,
      amount,
    });
    // Redeeming the points
    if (type === "DEBIT" && user.points>=amount&&amount>=100) {
      await newTransaction.save();
      user.points -= amount;
      const userData=await user.save();
      return NextResponse.json({
        userData,
        message: "Points Redeemed Successfully",
        success: true,
      });
    }
    // Adding Points to User's Account by Admin
    if (type === "CREDIT" && user.isAdmin) {
      await newTransaction.save();
      user.points += amount;
      await user.save();
      return NextResponse.json({
        message: "Points Added to User's Account Successfully",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
