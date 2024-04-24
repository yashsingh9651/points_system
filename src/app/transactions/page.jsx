"use client";
import { useSelector, useDispatch } from "react-redux";
import NotFound from "../not-found";
import Transactions from "@/components/Transactions";
import { getTransactions } from "@/redux/slices/user";
import { useEffect } from "react";

const page = () => {
  const transactions = useSelector((state) => state.user.transactions);
  const userData = useSelector((state) => state.user.userData);
  // Fetching Transactions
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.innerWidth < 1200) {
      dispatch(
        getTransactions({ email: userData.email, shopName: userData.shopName })
      );
    }
  }, [userData.points]);

  return (
    <>
      <div className="flex xl:hidden items-center flex-col gap-6 pt-20 lg:p-24 px-4">
        <Transactions transactions={transactions} />
      </div>
      <div className="hidden xl:block">
        <NotFound />
      </div>
    </>
  );
};
export default page;
