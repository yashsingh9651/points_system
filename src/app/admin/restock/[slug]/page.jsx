"use client";
import Table from "@/components/Table";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "next/image";
const page = ({ params }) => {
  // Converting html page to pdf format and Download pdf...
  const pdfRef = useRef();
  const printPdf = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: `${params.slug}`,
  });
  const { email } = useSelector((state) => state.user.userData);
  const [products, setProducts] = useState([]);
  const [billDetails, setBillDetails] = useState({});
  const fetchBill = async () => {
    const res = await axios.post("/api/admin/restockBills/getBill", {
      adminEmail: email,
      billNumber: params.slug,
    });
    setProducts(res.data.products);
    setBillDetails(res.data.details);
  };
  useEffect(() => {
    fetchBill();
  }, [email]);

  return (
    <div className="pt-16 lg:pt-24 px-5">
      {/* Bill Details */}
      <div
        ref={pdfRef}
        className="bg-gray-200 w-full rounded p-5 flex flex-col gap-4"
      >
        {/* Billing Details */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-lg">
          <div className="flex items-center gap-1">
            <h1>Sender's Name : {billDetails?.senderName}</h1>
          </div>
          <h1>Date : {billDetails?.date}</h1>
          <h1>{billDetails?.billNumber}</h1>
        </div>
        {/* Products List */}
        <Table
          data={products}
          tableHead={[
            "Product Name",
            "Quantity",
            "Buy Price",
            "Sell Price",
            "MRP",
            "Discount",
            "Total",
            "",
          ]}
          type={"RESTOCKBILLINGLIST"}
        />
        <h1 className="max-w-fit self-end text-lg font-medium">
          SubTotal: ₹ {billDetails?.subTotal}
        </h1>
      </div>
      <button
        onClick={() => printPdf()}
        className="bg-red-500 float-end mt-5 hover:bg-red-700 hover:scale-105 duration-200 text-white px-4 py-2 rounded-md"
      >
        Print Bill
      </button>
    </div>
  );
};

export default page;
