"use client";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../not-found";
import Transactions from "@/components/Transactions";
import { getTransactions } from "@/redux/slices/user";
import { useEffect } from "react";

const page = () => {
  const userData = useSelector((state) => state.user.userData);
  // Fetching Transactions
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.innerWidth < 1200) {
      dispatch(getTransactions({ email: userData.email }));
    }
  }, [userData.points]);

  return (
    <>
      <div className="xl:hidden pt-20 lg:p-24 px-4">
        <Transactions />
      </div>
      <div className="hidden xl:block">
        <NotFound />
      </div>
    </>
  );
};
export default page;
