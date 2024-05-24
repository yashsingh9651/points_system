"use client";
import React, { useState } from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, showBox } from "@/redux/slices/admin";
import toast from "react-hot-toast";
import axios from "axios";
const UpdateBox = () => {
  // Updating User Details
  const boxdetails = useSelector((state) => state.admin.boxdetails);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(boxdetails?.username);
  const [occupation, setOccupation] = useState(boxdetails?.occupation);
  const updateUser = async ({ occupation, username, email, _id }) => {
    const res = await axios.put("/api/admin/updateUser", {
      email,
      _id,
      username,
      occupation,
    });
    if (res.data.success) {
      dispatch(fetchUsers(email));
      toast.success(res.data.message);
      dispatch(showBox());
    } else {
      toast.error(res.data.error);
    }
  };
  return (
    <div className="w-screen h-screen z-50 absolute top-0 left-0 flex justify-center items-center backdrop-blur-sm">
      <div className="md:w-2/3 text-lg max-h-fit flex flex-col items-center gap-5 p-5 bg-white border border-gray-300 rounded-lg shadow-2xl">
        <h1 className="text-2xl font-medium">Update User Details</h1>
        <h1>User Email : {boxdetails.userEmail}</h1>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          User's occupation
        </Typography>
        <select
          className="w-full px-4 py-3 rounded-md bg-white border border-gray-400 focus:!border-t-gray-900"
          name="occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        >
          <option value="Businessman">Businessman</option>
          <option value="Painter">Painter</option>
          <option value="Plumber">Plumber</option>
          <option value="Plumber">Customer</option>
        </select>
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          User's Name
        </Typography>
        <Input
          name="username"
          type="text"
          size="lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <div className="flex w-full justify-end gap-5">
          <Button
            onClick={() => dispatch(showBox())}
            className="mt-6 bg-red-400"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              updateUser({
                _id: boxdetails._id,
                occupation,
                username,
                email: boxdetails.email,
              })
            }
            className="mt-6 bg-green-500"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBox;
