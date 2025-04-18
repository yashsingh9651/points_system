import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { sendMail } from "@/helpers/mailer";

export async function POST(request) {
  try {
    connect();
    const reqBody = await request.json();
    const { username, email, password,occupation } = reqBody;
    //check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User already exists" });
    }
    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      occupation,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    // send verification mail
    // await sendMail({ email, emailType: "VERIFY", userId: savedUser._id,name:username });
    return NextResponse.json({
      message: "User created successfully, Please verify your email to login.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
