"use client";
import Table from "@/components/Table";
import { fetchProducts, newBillNumber, resetBill } from "@/redux/slices/admin";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import AddToRestockListBox from "@/components/AddToRestockListBox";

const page = () => {
  const { email } = useSelector((state) => state.user.userData);
  const billProdList = useSelector((state) => state.admin.billProdList);
  const showAddToListBox = useSelector((state) => state.admin.showAddToListBox);
  const billNumber = useSelector((state) => state.admin.billNumber);
  const date = useSelector((state) => state.admin.date);
  const subTotal = useSelector((state) => state.admin.subTotal);
  const [senderName, setSenderName] = useState("");
  const [loading, setLoading] = useState(false);
  // Converting html page to pdf format and Download pdf...
  const pdfRef = useRef();
  const printPdf = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: `Restock-${billNumber}`,
  });
  // generating Bill & sending data to database
  const generateBill = async (data) => {
    if (senderName.length > 0) {
      setLoading(true);
      const response = await axios.post(
        "/api/admin/restockBills/newBill",
        data
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setLoading(false);
        setSenderName("");
        dispatch(resetBill());
        dispatch(fetchProducts(email));
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    }else{
      toast.error("Enter senders name");
    }
  };
  // Fetching All Products and users
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newBillNumber());
    dispatch(fetchProducts(email));
  }, [email]);
  return (
    <div className="pt-16 lg:pt-24 px-6 flex flex-col gap-5 items-center">
      {showAddToListBox && <AddToRestockListBox />}
      {/* Search Produt Section */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Search a Product
      </h1>
      <SearchBar type={"NEWBILL"} />
      {/* Bill */}
      <div
        ref={pdfRef}
        className="bg-gray-200 w-full rounded p-5 flex flex-col gap-4"
      >
        {/* Billing Details */}
        <div className="flex flex-col lg:flex-row justify-between items-center text-base lg:text-lg">
          <div className="flex items-center gap-1">
            <h1>Name :</h1>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              name="name"
              autoFocus="true"
              className="lg:w-3/4 bg-transparent focus:outline outline-black p-1 text-lg border-none border rounded-md"
              placeholder="Enter Sender Name"
            />
          </div>
          <h1>Date : {date}</h1>
          <h1>{billNumber}</h1>
        </div>
        {/* Products List */}
        <Table
          data={billProdList}
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
          type={"NEWRESTOCKBILLINGLIST"}
        />
        <h1 className="max-w-fit self-end text-lg font-medium">
          SubTotal: ₹ {subTotal}
        </h1>
      </div>
      {/* Buttons */}
      <div className="flex justify-end gap-5 w-full">
        {!loading ? (
          <button
            onClick={() =>
              generateBill({
                adminEmail: email,
                billProdList,
                billNumber,
                date,
                subTotal,
                senderName,
              })
            }
            className="bg-green-500 hover:scale-105 duration-200 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Generate Bill
          </button>
        ) : (
          <button className="bg-black rounded px-4 py-2">
            <Loading />
          </button>
        )}
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
