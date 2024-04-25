"use client";
import Table from "@/components/Table";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const page = () => {
  const { email } = useSelector((state) => state.user.userData);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const usersHead = ["Name", "Occupation", "Points", "Email", ""];
  const transHead = ["username","Email","Amount", "Status", ""];
  const fetchUsers = async () => {
    const res = await axios.post("/api/admin", { email });
    setUsers(res.data.users);
    setTransactions(res.data.transactions);
  };
  useEffect(() => {
    fetchUsers();
  }, [email]);

  return (
    <div className="lg:pt-24 pt-16 px-4 lg:px-10">
      <h1 className="text-2xl font-medium font-Ubuntu text-center mb-4">All Users Details</h1>
      <Table data={users} tableHead={usersHead} type={"USERS"} />
      <h1 className="text-2xl font-medium font-Ubuntu text-center my-4">All Transactions Details</h1>
      <Table data={transactions} tableHead={transHead} type={"TRANSACTIONS"} />
    </div>
  );
};

export default page;
