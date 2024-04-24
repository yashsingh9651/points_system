"use client";
import React, { useState } from "react";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";
import { useDispatch,useSelector } from "react-redux";
import { addTranscations } from "@/redux/slices/user";
import ProfileSkeleton from "@/skeleton/ProfileSkeleton";
const Profile = ({ userData }) => {
  const isUserFetched = useSelector((state)=>state.user.isUserFetched);
  const [showBox, setShowBox] = useState(false);
  const [points, setPoints] = useState(null);
  const dispatch = useDispatch();
  const handleRedeem = () => {
    dispatch(
      addTranscations({
        type: "DEBIT",
        email: userData.email,
        amount: points,
        shopName: userData.shopName,
      })
    );
    setPoints(null);
    setShowBox(false);
  };
  return (
    <>
      {isUserFetched?<Card className="w-10/12 md:w-1/2 lg:w-96 py-4 border border-gray-300">
        <div className="w-14 mx-auto rounded-full aspect-square overflow-hidden bg-gray-500 text-center text-gray-100 object-cover text-6xl font-black">
          {userData.username?.charAt(0)}
        </div>
        <CardBody className="text-black text-lg">
          <div className="font-medium flex items-start md:items-center justify-between">
            <h1>{userData.username}</h1>
            <h1>{userData.points}</h1>
          </div>
          <h1>{userData?.shopName}</h1>
          <h1>{userData.email}</h1>
        </CardBody>
        <CardFooter className="py-0">
          {!showBox && (
            <Button
              ripple={false}
              fullWidth={true}
              onClick={() => setShowBox(true)}
              className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 text-base hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              Redeem Points
            </Button>
          )}
          {/* Redeem Box */}
          {showBox && (
            <div className="flex flex-col gap-2 relative">
              {points < 100 && (
                <h1 className="absolute -top-7 text-red-600 left-0">
                  Minimum 100 points to redeem
                </h1>
              )}
              {points > userData.points && (
                <h1 className="absolute -top-7 text-red-600 left-0">
                  You can redeem maximum {userData.points} points
                </h1>
              )}
              <input
                type="number"
                autoFocus
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="Enter Points to Redeem"
                className="border focus:outline-none border-gray-300 rounded-md p-2"
              />
              <div className="flex gap-5">
                <Button
                  ripple={false}
                  onClick={() => setShowBox(false)}
                  className="bg-red-400 w-1/2 hover:bg-red-600 text-white duration-300 shadow-none hover:scale-105 text-base hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Cancel
                </Button>
                <Button
                  ripple={false}
                  disabled={points < 100 || points > userData.points}
                  onClick={() => handleRedeem()}
                  className="bg-green-500 hover:bg-green-700 duration-300 w-1/2 text-white shadow-none hover:scale-105 text-base hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                  Redeem
                </Button>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>:<ProfileSkeleton/>}
    </>
  );
};

export default Profile;
