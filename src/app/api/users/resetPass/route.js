import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendMail } from "@/helpers/mailer";
connect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email } = reqBody;
    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "Gmail not Found",
        success: false,
      });
    }
    await sendMail({ email, emailType: "RESET", userId: user._id });
    return NextResponse.json({
      message: "Reset Password Link send to your given gmail address",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
