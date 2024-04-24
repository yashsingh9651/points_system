"use client";
import { useSelector } from "react-redux";
import Profile from "@/components/Profile";
import NotFound from "../not-found";

const page = () => {
  const userData = useSelector((state) => state.user.userData);
  return (
    <>
      <div className="flex xl:hidden justify-center items-center gap-24 h-screen">
        <Profile userData={userData} />
      </div>
      <div className="hidden xl:block">
        <NotFound/>
      </div>
    </>
  );
};
export default page;
