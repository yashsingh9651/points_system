"use client";
import Table from "@/components/Table";
import { fetchProducts } from "@/redux/slices/admin";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import AddToListBox from "@/components/AddToListBox";

const page = () => {
  const { email } = useSelector((state) => state.user.userData);
  const products = useSelector((state) => state.admin.products);
  const billProdList = useSelector((state) => state.admin.billProdList);
  const showAddToListBox = useSelector((state) => state.admin.showAddToListBox);
  const subTotal = useSelector((state) => state.admin.subTotal);
  // Fetching All Products
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(email));
  }, [email]);
  // Searching products based on search fields
  const [searchProducts, setSearchProducts] = useState([]);
  const handleSearchChange = (e) => {
    const search = e.target.value;
    if (search.length <= 1 || search == "") {
      setSearchProducts([]);
    } else {
      const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchProducts(filteredProducts);
    }
  };
  return (
    <div className="pt-16 lg:pt-24 px-6 flex flex-col gap-5 items-center">
      {showAddToListBox&&<AddToListBox />}
      {/* Search Produt Section */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Search a Product
      </h1>
      <input
        onChange={handleSearchChange}
        type="text"
        className="lg:w-3/4 p-2 border-gray-500 border rounded-md"
        placeholder="Search by Product Name"
      />
      {/* Product list */}
      <div className="relative bg-white z-20 w-full -mt-4">
        <div className="absolute w-full top-0 left-0">
          <Table data={searchProducts} tableHead={[]} type={"NEWBILL"} />
        </div>
      </div>
      {/* Bill */}
      <div className="bg-gray-200 w-4/5 rounded p-4 flex flex-col gap-4">
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
              className="lg:w-3/4 p-1 text-lg border-none border rounded-md"
              placeholder="Enter Customer Name"
            />
          </div>
          <h1>Date : 20 Nov 2023</h1>
          <h1>Bill Number : 69</h1>
        </div>
        {/* Products List */}
        <Table data={billProdList} tableHead={["Product Name", "Quantity", "Price", "Total",""]} type={"BILLINGLIST"} />
        <h1 className="max-w-fit self-end text-lg font-medium">SubTotal: ₹ {subTotal}</h1>
        <div className="flex justify-end gap-5">
          <button className="bg-green-500 hover:scale-105 duration-200 hover:bg-green-700 text-white px-4 py-2 rounded-md">
            Generate Bill
          </button>
          <button className="bg-red-500 hover:bg-red-700 hover:scale-105 duration-200 text-white px-4 py-2 rounded-md">
            Print Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
