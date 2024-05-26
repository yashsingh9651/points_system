"use client";
import { Typography, Input, Button } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Schema } from "@/Schema/Product";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

const ProductForm = () => {
    // Adding new product to database
  const [loading, setLoading] = useState(false);
  const form = useRef();
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        name: "",
        quantity: "",
        buyPrice: "",
        sellPrice: "",
        MRP: "",
        discount: "",
      },
      validationSchema: Schema,
      onSubmit: async (values, action) => {
        setLoading(true);
        const { name, quantity, buyPrice, sellPrice, MRP, discount } = values;
        const res = await axios.post("/api/admin/product/addProduct", {
          adminEmail: email,
          name,
          quantity,
          buyPrice,
          sellPrice,
          MRP,
          discount,
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
  return (
    <form
        ref={form}
        onSubmit={handleSubmit}
        className="my-2 w-80 max-w-screen-lg sm:w-96 lg:w-full"
      >
        <div className="mb-1 grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div>
            <Typography variant="h6" color="blue-gray" className="">
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
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="">
              Product Quantity
            </Typography>
            <div className="relative">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="quantity"
                type="number"
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
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="">
              Product Buying Price
            </Typography>
            <div className="relative">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="buyPrice"
                value={values.buyPrice}
                type="number"
                size="lg"
                placeholder="Enter product Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.buyPrice && touched.buyPrice && (
                <p className="absolute top-3 right-2 text-red-600">
                  {errors.buyPrice}
                </p>
              )}
            </div>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="">
              Product Selling Price
            </Typography>
            <div className="relative">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="sellPrice"
                value={values.sellPrice}
                type="number"
                size="lg"
                placeholder="Enter product Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.sellPrice && touched.sellPrice && (
                <p className="absolute top-3 right-2 text-red-600">
                  {errors.sellPrice}
                </p>
              )}
            </div>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="">
              Product MRP
            </Typography>
            <div className="relative">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="MRP"
                value={values.MRP}
                type="number"
                size="lg"
                placeholder="Enter product Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.MRP && touched.MRP && (
                <p className="absolute top-3 right-2 text-red-600">
                  {errors.MRP}
                </p>
              )}
            </div>
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="">
              Product Discount %
            </Typography>
            <div className="relative">
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name="discount"
                value={values.discount}
                type="number"
                size="lg"
                placeholder="Enter product Price"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {errors.discount && touched.discount && (
                <p className="absolute top-3 right-2 text-red-600">
                  {errors.discount}
                </p>
              )}
            </div>
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
  )
}

export default ProductForm