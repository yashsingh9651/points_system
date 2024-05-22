"use client";
import { Schema } from "@/Schema/Product";
import Table from "@/components/Table";
import { Typography, Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { fetchProducts } from "@/redux/slices/admin";
import Loading from "@/components/Loading";

const page = () => {
  const productsHead = ["Product Name", "Quantity", "Price", ""];
  const { email } = useSelector((state) => state.user.userData);
  const products = useSelector((state) => state.admin.products);
  // Adding new product
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        quantity: "",
        price: "",
      },
      validationSchema: Schema,
      onSubmit: async (values, action) => {
        setLoading(true);
        const { name, quantity, price } = values;
        const res = await axios.post("/api/admin/product/addProduct", {
          adminEmail: email,
          name,
          quantity,
          price,
        });
        if (res.data.success) {
          action.resetForm();
          setLoading(false);
          toast.success(res.data.message);
          dispatch(fetchProducts(email));
        } else {
          toast.error(res.data.error);
        }
      },
    });
  // Fetching All Products
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(email));
  }, [email]);
  // Searching Product
  const [searchProducts, setSearchProducts] = useState([]);
  const handleSearchChange = (e) => {
    const search = e.target.value;
    if (search.length <= 1 || search == "") {
      setSearchProducts([]);
    } else {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchProducts(filteredProducts);
    }
  };
  return (
    <div className="w-screen flex gap-5 flex-col items-center pt-16 lg:pt-24 px-6 py-10">
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
      <div className="relative bg-white z-20 w-full -mt-4">
        <div className="absolute w-full top-0 left-0">
          <Table
            data={searchProducts}
            tableHead={productsHead}
            type={"SEARCH"}
          />
        </div>
      </div>
      {/* Adding Produts Section */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Add a Product
      </h1>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="my-2 w-80 max-w-screen-lg sm:w-96 lg:w-4/5"
      >
        <div className="mb-1 flex flex-col gap-3">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Name
          </Typography>
          <div className="relative">
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name="name"
              value={values.name}
              size="lg"
              placeholder="Enter Product Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.name && touched.name && (
              <p className="absolute top-3 right-2 text-red-600">
                {errors.name}
              </p>
            )}
          </div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Quantity
          </Typography>
          <div className="relative">
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name="quantity"
              value={values.quantity}
              size="lg"
              placeholder="Enter product quantity"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.quantity && touched.quantity && (
              <p className="absolute top-3 right-2 text-red-600">
                {errors.quantity}
              </p>
            )}
          </div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Product Price
          </Typography>
          <div className="relative">
            <Input
              onChange={handleChange}
              onBlur={handleBlur}
              name="price"
              value={values.price}
              type="number"
              size="lg"
              placeholder="Enter product Price"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.price && touched.price && (
              <p className="absolute top-3 right-2 text-red-600">
                {errors.price}
              </p>
            )}
          </div>
        </div>
        {!loading ? (
          <Button type="submit" className="mt-6" fullWidth>
            Add Product
          </Button>
        ) : (
          <Button className="mt-6" fullWidth>
            <Loading />
          </Button>
        )}
      </form>
      {/* Products */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center">
        Current Stock
      </h1>
      <Table data={products} tableHead={productsHead} type={"PRODUCTS"} />
    </div>
  );
};

export default page;
