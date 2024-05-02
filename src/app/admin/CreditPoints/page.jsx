"use client";
import { fetchData } from "@/redux/slices/user";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user.userData);
  const allUsers = useSelector((state) => state.user.allUsers);
  useEffect(() => {
    dispatch(fetchData(email));
  }, [email]);
  // Crediting the points by sending data requests
  const [values, setValues] = useState({ email: "", amount: 0, username: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  // Sending the data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/admin/creditPoints", {
      ...values,
      adminEmail: email,
    });
    if (res.data.success) {
      toast.success(res.data.message);
      setValues({ email: "", amount: 0, username: "" });
    } else {
      toast.error(res.data.error);
    }
  };
  return (
    <div className="flex-col flex items-center justify-center h-screen">
      <h1 className="text-xl text-center font-medium">Credit Points</h1>
      <form className="w-1/2 flex flex-col items-center gap-4 mt-4">
        <h1 className="self-start -mb-3 pl-2 text-lg font-medium">
          Select User's Email
        </h1>
        <select
          className="w-full p-3 rounded-md"
          onChange={(e) => handleChange(e)}
          name="email"
        >
          <option></option>
          {allUsers?.map((user) => (
            <option
              key={user._id}
              onClick={() => setValues({ ...values, username: user.username })}
              value={user.email}
            >
              {user.email}
            </option>
          ))}
        </select>
        <h1 className="self-start -mb-4 pl-2 text-lg font-medium">
          Enter Amount to Credit
        </h1>
        <input
          type="number"
          name="amount"
          onChange={(e) => handleChange(e)}
          value={values.amount}
          placeholder="Enter Amount"
          className="w-full bg-gray-200 text-black p-3 rounded-md my-2"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="p-3 bg-green-500 rounded-md hover:scale-105 duration-300 self-end font-medium"
        >
          Credit Points
        </button>
      </form>
    </div>
  );
};

export default page;
