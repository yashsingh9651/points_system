"use client";
import Table from "@/components/Table";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect} from "react";
import { fetchProducts } from "@/redux/slices/admin";
import SearchBar from "@/components/SearchBar";
import ProductForm from "@/components/ProductForm";

const page = () => {
  const { email } = useSelector((state) => state.user.userData);
  const products = useSelector((state) => state.admin.products);
  // Fetching All Products
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(email));
  }, [email]);
  return (
    <div className="w-screen flex gap-5 flex-col items-center pt-16 lg:pt-24 px-6 py-10">
      {/* Search Produt Section */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Search a Product
      </h1>
      <SearchBar type={"SEARCH"}/>
      {/* Adding Produts Section */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Add a Product
      </h1>
      <ProductForm/>
      {/* Products */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Current Stock
      </h1>
      <Table
        data={products}
        tableHead={["Product Name", "Quantity", "Buying Price", "Selling Price", "MRP","discount",""]}
        type={"PRODUCTS"}
      />
    </div>
  );
};

export default page;
