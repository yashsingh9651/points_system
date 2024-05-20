"use client";
import { Schema } from "@/Schema/Product";
import Table from "@/components/Table";
import { Typography, Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

const page = () => {
  const productsHead = ["Product Name", "Quantity", "Price", ""];
  const { email } = useSelector((state) => state.user.userData);
  // Adding new product
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
        const { name, quantity, price } = values;
        const res = await axios.post("/api/admin/product/addProduct", {
          adminEmail: email,
          name,
          quantity,
          price,
        });
        if (res.data.success) {
          action.resetForm();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.error);
        }
      },
    });
    // Fetching ALL Products
    const dispatch = useDispatch();
    // useEffect(() => {
    //   dispatch(fetchProducts(email));
    // }, [email])
    
  return (
    <div className="w-screen pt-16 lg:pt-24 px-6">
      <h1 className="text-2xl font-medium font-Ubuntu text-center my-4">
        Add a Product
      </h1>
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="my-2 w-80 mx-auto max-w-screen-lg sm:w-96 lg:w-1/2"
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
        <Button type="submit" className="mt-6" fullWidth>
          Add Product
        </Button>
      </form>
      {/* Current Inventory */}
      <h1 className="text-2xl font-medium font-Ubuntu text-center my-4">
        Current Stock
      </h1>
      <Table data={[]} tableHead={productsHead} type={"PRODUCTS"} />
    </div>
  );
};

export default page;
