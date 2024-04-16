"use client";
import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loading from "@/components/Loading";

const page = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await axios.post("/api/users/resetPass", { email });
    if (response.data.success) {
      toast.success(response.data.message);
      setEmail("");
      setLoading(false);
    } else {
      toast.error(response.data.message);
    }
    console.log(response.data);
  };
  return (
    <div className="flex justify-center items-center gap-24 h-screen">
      <Toaster />
      <Card color="transparent" shadow={false}>
        <Typography variant="h5" color="blue-gray">
          Reset Password
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your Email to Reset Password.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {!loading ? (
              <Button onClick={() => handleSubmit()} fullWidth>
                Send Mail
              </Button>
            ) : (
              <Button fullWidth>
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
