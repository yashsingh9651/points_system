import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
connect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid token" });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ message: "Email verified",success:true });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
