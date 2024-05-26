import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
connect();

export async function PUT(request) {
  try {
    const { email, _id, occupation, username } = await request.json();
    const admin = await User.findOne({ email });
    if (admin.isAdmin) {
      await User.findByIdAndUpdate(_id, { occupation, username });
      return NextResponse.json({
        success: true,
        message: "User Updated Successfully",
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
