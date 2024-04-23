"use client";
import { useSelector } from "react-redux";
import Profile from "@/components/profile";
import NotFound from "../not-found";

const page = () => {
  const userData = useSelector((state) => state.user.userData);
  return (
    <>
      <div className="flex lg:hidden justify-center items-center gap-24 h-screen">
        <Profile userData={userData} />
      </div>
      <div className="hidden lg:block">
        <NotFound/>
      </div>
    </>
  );
};
export default page;
