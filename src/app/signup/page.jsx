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
  const [showPass, setShowPass] = useState(false);
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
                  <option value="Customer">Customer</option>
                  <option value="Painter">Painter</option>
                  <option value="Plumber">Plumber</option>
                  <option value="builder">Builder</option>
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
                  type={`${!showPass ? "password" : "text"}`}
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
                <svg
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#0D0D0D" />
                <path
                  d="M21.894 11.553C19.736 7.236 15.904 5 12 5c-3.903 0-7.736 2.236-9.894 6.553a1 1 0 0 0 0 .894C4.264 16.764 8.096 19 12 19c3.903 0 7.736-2.236 9.894-6.553a1 1 0 0 0 0-.894zM12 17c-2.969 0-6.002-1.62-7.87-5C5.998 8.62 9.03 7 12 7c2.969 0 6.002 1.62 7.87 5-1.868 3.38-4.901 5-7.87 5z"
                  fill="#0D0D0D"
                />
              </svg>
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
