"use client";
import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPass, setShowPass] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetPass/verify", {
        token,
        password,
      });
      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (error) {
      toast.error(response.data.error);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);
  return (
    <div className="flex justify-center items-center gap-24 h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h5" color="blue-gray">
          Reset Password
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Enter New Password
            </Typography>
            <div className="relative">
              <Input
                name="password"
                type={`${!showPass ? "password" : "text"}`}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoFocus
                size="lg"
                placeholder="password"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
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
            {!loading ? (
              <Button onClick={() => handleSubmit()} fullWidth>
                Reset Password
              </Button>
            ) : (
              <Button className="mt-6" fullWidth>
                <Loading />
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default page;
