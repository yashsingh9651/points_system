"use client";
import Table from "@/components/Table";
import { fetchProducts, searchProductsList } from "@/redux/slices/admin";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import AddToListBox from "@/components/AddToListBox";
import { useReactToPrint } from "react-to-print";

const page = () => {
  const { email } = useSelector((state) => state.user.userData);
  const billProdList = useSelector((state) => state.admin.billProdList);
  const searchedProducts = useSelector((state) => state.admin.searchedProducts);
  const showAddToListBox = useSelector((state) => state.admin.showAddToListBox);
  const subTotal = useSelector((state) => state.admin.subTotal);
  const pdfRef = useRef();
  // Converting html page to pdf format and Download pdf...
  const printPdf = useReactToPrint({
    content: () => pdfRef.current,
    documentTitle: `Bill Number-69`,
  });
  // Fetching All Products
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(email));
  }, [email]);
  return (
    <div className="pt-16 lg:pt-24 px-6 flex flex-col gap-5 items-center">
      {showAddToListBox && <AddToListBox />}
      {/* Search Produt Section */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Search a Product
      </h1>
      <input
        onChange={(e) => dispatch(searchProductsList(e.target.value))}
        type="text"
        className="lg:w-3/4 p-2 border-gray-500 border rounded-md"
        placeholder="Search by Product Name"
      />
      {/* Searched Product list */}
      <div className="relative bg-white z-20 w-full -mt-4">
        <div className="absolute w-full top-0 left-0">
          <Table data={searchedProducts} tableHead={[]} type={"NEWBILL"} />
        </div>
      </div>
      {/* Bill */}
      <div
        ref={pdfRef}
        className="bg-gray-200 w-full rounded p-5 flex flex-col gap-4"
      >
        {/* Heading LOGO */}
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
              name="name"
              autoFocus="true"
              className="lg:w-3/4 bg-transparent focus:outline outline-black p-1 text-lg border-none border rounded-md"
              placeholder="Enter Customer Name"
            />
          </div>
          <h1>Date : 20 Nov 2023</h1>
          <h1>Bill Number : 69</h1>
        </div>
        {/* Products List */}
        <Table
          data={billProdList}
          tableHead={["Product Name", "Quantity", "Price", "Total", ""]}
          type={"BILLINGLIST"}
        />
        <h1 className="max-w-fit self-end text-lg font-medium">
          SubTotal: ₹ {subTotal}
        </h1>
      </div>
      <div className="flex justify-end gap-5 w-full">
        <button className="bg-green-500 hover:scale-105 duration-200 hover:bg-green-700 text-white px-4 py-2 rounded-md">
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
