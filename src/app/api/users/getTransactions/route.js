import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import Transaction from "@/models/transModel";
connect();

export async function POST(request) {
  try {
    const { email} = await request.json();
    const transactions = await Transaction.find({ email });
    transactions.reverse();
    return NextResponse.json({ transactions, success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, success: false });
  }
}
