"use client";
import Table from "@/components/Table";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/redux/slices/user";
import UpdateBox from "@/components/UpdateBox";
const page = () => {
  const dispatch = useDispatch();
  const showBox = useSelector((state) => state.user.showBox);
  const { email } = useSelector((state) => state.user.userData);
  const users = useSelector((state) => state.user.allUsers);
  const transactions = useSelector((state) => state.user.allTransactions);
  const usersHead = ["Name", "Occupation", "Points", "Email", ""];
  const transHead = ["username", "Email", "Amount","Type", "Status", ""];
  useEffect(() => {
    dispatch(fetchData(email));
  }, [email]);

  return (
    <div className="lg:pt-24 pt-16 px-4 lg:px-10 relative pb-8">
      {showBox&&<UpdateBox/>}
      <h1 className="text-2xl font-medium font-Ubuntu text-center mb-4">
        All Users Details
      </h1>
      <Table data={users} tableHead={usersHead} type={"USERS"} />
      <h1 className="text-2xl font-medium font-Ubuntu text-center my-4">
        All Transactions Details
      </h1>
      <Table data={transactions} tableHead={transHead} type={"TRANSACTIONS"} />
    </div>
  );
};

export default page;
