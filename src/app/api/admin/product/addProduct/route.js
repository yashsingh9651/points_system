import { connect } from "@/dbConfig/dbConfig";
import Product from "@/models/product";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
connect();
export async function POST(request) {
  try {
    const { adminEmail, name, quantity, buyPrice, sellPrice, MRP, discount } =
      await request.json();
    const admin = await User.findOne({ email: adminEmail });
    if (admin.isAdmin) {
      const newProduct = new Product({
        name,
        quantity,
        buyPrice,
        sellPrice,
        MRP,
        discount,
      });
      await newProduct.save();
      return NextResponse.json({
        success: true,
        message: "Product Added Successfully",
        newProduct,
      });
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
