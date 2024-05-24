"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { Schema } from "@/Schema/signup";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // Form Handling using formik and yup.
  const form = useRef();
  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        occupation: "Businessman",
        password: "",
      },
      validationSchema: Schema,
      onSubmit: async (values, action) => {
        setLoading(true);
        const res = await axios.post("/api/users/signup", values);
        if (res.data.success) {
          action.resetForm();
          setLoading(false);
          toast.success(res.data.message);
          router.push("/login");
        } else {
          toast.error(res.data.error);
        }
      },
    });
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Card color="transparent" shadow={false}>
          <Typography variant="h5" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form
            ref={form}
            onSubmit={handleSubmit}
            className="my-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-3">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Name
              </Typography>
              <div className="relative">
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="username"
                  value={values.username}
                  size="lg"
                  placeholder="your name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.username && touched.username && (
                  <p className="absolute top-3 right-2 text-red-600">
                    {errors.username}
                  </p>
                )}
              </div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <div className="relative">
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  value={values.email}
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.email && touched.email && (
                  <p className="absolute top-3 right-2 text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Occupation
              </Typography>
              <div className="relative">
                <select
                  value={values.occupation}
                  className="w-full px-4 py-3 rounded-md bg-white border border-gray-400 focus:!border-t-gray-900"
                  name="occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="Businessman">Businessman</option>
                  <option value="Businessman">Customer</option>
                  <option value="Painter">Painter</option>
                  <option value="Plumber">Plumber</option>
                </select>
                {errors.occupation && touched.occupation && (
                  <p className="absolute top-3 right-2 text-red-600">
                    {errors.occupation}
                  </p>
                )}
              </div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <div className="relative">
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  value={values.password}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.password && touched.password && (
                  <p className="absolute top-3 right-2 text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
            {!loading ? (
              <Button type="submit" className="mt-6" fullWidth>
                sign up
              </Button>
            ) : (
              <Button className="mt-6" fullWidth>
                <Loading />
              </Button>
            )}
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium hover:underline text-gray-900"
              >
                Log In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
};
export default Page;
