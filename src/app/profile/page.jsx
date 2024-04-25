"use client";
import Profile from "@/components/Profile";
import NotFound from "../not-found";

const page = () => {
  return (
    <>
      <div className="flex xl:hidden justify-center items-center gap-24 h-screen">
        <Profile />
      </div>
      <div className="hidden xl:block">
        <NotFound/>
      </div>
    </>
  );
};
export default page;
