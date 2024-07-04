"use client";
import { searchProductsList } from "@/redux/slices/admin";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./Table";

const SearchBar = ({type}) => {
  const dispatch = useDispatch();
  const searchedProducts = useSelector((state) => state.admin.searchedProducts);
  return (
    <>
      <input
        onChange={(e) => dispatch(searchProductsList(e.target.value))}
        type="text"
        className="lg:w-3/4 p-2 border-gray-500 border rounded-md"
        placeholder="Search by Product Name"
      />
      {/* Searched Product list */}
      <div className="relative bg-white z-20 w-full -mt-4">
        <div className="absolute w-full top-0 left-0">
          <Table data={searchedProducts} tableHead={["Product Name", "Quantity", "Buying Price", "Selling Price", "MRP","discount",""]} type={type} />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
