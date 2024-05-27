"use client";
import Table from "@/components/Table";
import {
  fetchProducts,
  fetchUsers,
  newBillNumber,
  resetBill,
} from "@/redux/slices/admin";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import AddToListBox from "@/components/AddToListBox";
import { useReactToPrint } from "react-to-print";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  const { email } = useSelector((state) => state.user.userData);
  const billProdList = useSelector((state) => state.admin.billProdList);
  const showAddToListBox = useSelector((state) => state.admin.showAddToListBox);
  const billNumber = useSelector((state) => state.admin.billNumber);
  const date = useSelector((state) => state.admin.date);
  const subTotal = useSelector((state) => state.admin.subTotal);
  const users = useSelector((state) => state.admin.allUsers);
  const [customerName, setCustomerName] = useState("");
  const [broker, setBroker] = useState("");
  // Converting html page to pdf format and Download pdf...
  const pdfRef = useRef();
  const printPdf = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: `${billNumber}`,
  });
  // generating Bill & sending data to database
  const generateBill = async (data) => {
    const response = await axios.post("/api/admin/Bills/newBill", data);
    if (response.data.success) {
      toast.success(response.data.message);
      setCustomerName("");
      dispatch(resetBill());
      dispatch(fetchProducts(email));
    } else {
      toast.error(response.data.message);
    }
  };
  // Fetching All Products and users
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers(email));
    dispatch(newBillNumber());
    dispatch(fetchProducts(email));
  }, [email]);
  return (
    <div className="pt-16 lg:pt-24 px-6 flex flex-col gap-5 items-center">
      {showAddToListBox && <AddToListBox />}
      {/* Search Produt Section */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Search a Product
      </h1>
      <SearchBar type={"NEWBILL"} />
      {/* Brokers List */}
      <select
        className="w-full p-3 rounded-md bg-white border border-gray-400 focus:!border-t-gray-900"
        name="broker"
        value={broker}
        onChange={(e) => setBroker(e.target.value)}
      >
        <option value="">Select Broker</option>
        {users?.map((user) => (
          <option
            key={user.email}
            className="flex justify-between"
            value={user.email}
          >
            {user.email}
          </option>
        ))}
      </select>
      {/* Bill */}
      <div
        ref={pdfRef}
        className="bg-gray-200 w-full rounded p-5 flex flex-col gap-4"
      >
        {/* LOGO */}
        <div className="mx-auto max-w-fit font-semibold text-lg lg:text-xl flex gap-2 items-center">
          <Image
            width={200}
            height={200}
            className="w-6 lg:w-8 aspect-square object-cover"
            src="/logo_black.png"
            alt="logo"
          />
          <h1>Akanksha Enterprises</h1>
        </div>
        {/* Billing Details */}
        <div className="flex justify-between items-center text-lg">
          <div className="flex items-center gap-1">
            <h1>Name :</h1>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              name="name"
              autoFocus="true"
              className="lg:w-3/4 bg-transparent focus:outline outline-black p-1 text-lg border-none border rounded-md"
              placeholder="Enter Customer Name"
            />
          </div>
          <h1>Date : {date}</h1>
          <h1>{billNumber}</h1>
        </div>
        {/* Products List */}
        <Table
          data={billProdList}
          tableHead={["Product Name", "Quantity", "Price", "Total", ""]}
          type={"NEWBILLINGLIST"}
        />
        <h1 className="max-w-fit self-end text-lg font-medium">
          SubTotal: ₹ {subTotal}
        </h1>
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-5 w-full">
        <button
          onClick={() =>
            generateBill({
              adminEmail: email,
              billProdList,
              billNumber,
              date,
              subTotal,
              customerName,
              broker,
            })
          }
          className="bg-green-500 hover:scale-105 duration-200 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Generate Bill
        </button>
        <button
          onClick={() => printPdf()}
          className="bg-red-500 hover:bg-red-700 hover:scale-105 duration-200 text-white px-4 py-2 rounded-md"
        >
          Print Bill
        </button>
      </div>
    </div>
  );
};

export default page;
