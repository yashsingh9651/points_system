"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import Link from "next/link";

const page = () => {
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyToken", { token });
      if (response.data.success) {
        setVerified(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);
  useEffect(() => {
    verifyEmail();
  }, [token]);

  return (
    <div className="h-screen flex justify-center gap-5 items-center">
      {verified ? (
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-3xl font-bold text-green-500">Email Verified</h1>
          <p className="text-lg text-gray-500">
            Your email has been verified successfully.
          </p>
          <Button>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-3xl font-bold text-red-300">
            Email Verifying...
          </h1>
          <p className="text-lg text-gray-500">Wait your email is verifying.</p>
        </div>
      )}
    </div>
  );
};

export default page;
