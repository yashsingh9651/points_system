"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
const page = () => {
  const { email } = useSelector((state) => state.user.userData);
  const [bills, setBills] = useState([]);
  const fetchBills = async () => {
    const response = await axios.post("/api/admin/Bills", {
      adminEmail: email,
    });
    setBills(response.data.bills);
  };
  useEffect(() => {
    fetchBills();
  }, [email]);

  return (
    <div className="pt-16 lg:pt-24 px-6 flex flex-col gap-4">
      {bills?.map((bill) => (
        <Link
          href={`/admin/bills/${bill.billNumber}`}
          className="grid xl:grid-cols-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer hover:bg-gray-200 duration-200 bg-gray-300 p-2 lg:px-3 lg:py-4 rounded xl:place-items-center"
        >
          <h1>{bill.billNumber}</h1>
          <h1>{bill.date}</h1>
          <h1>Customer Name: {bill.customerName}</h1>
          <h1>₹ {bill.subTotal}</h1>
          <h1>Broker Email: {bill.broker}</h1>
        </Link>
      ))}
    </div>
  );
};

export default page;
