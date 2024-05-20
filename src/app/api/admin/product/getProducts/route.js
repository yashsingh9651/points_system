import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/product";
import User from "@/models/userModel";
import NextResponse from "next/server";
connect();
export async function POST(request) {
  try {
    const { adminEmail } = request.json();
    const admin = await User.findOne({ email: adminEmail });
    if (admin.isAdmin) {
      const Products = await Product.find();
      return NextResponse.json(Products);
    } else {
      return NextResponse.json({
        success: false,
        error: "Only Admin access is allowed",
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
