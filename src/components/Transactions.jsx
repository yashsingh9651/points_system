"use client";
import React from "react";

const Transactions = ({ transactions }) => {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center font-sans">
        Transcations
      </h1>
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className="flex gap-5 items-center justify-between border border-gray-300 shadow-lg rounded-md p-3 w-full"
        >
          {transaction.type !== "DEBIT" ? (
            <h1 className="text-3xl font-medium text-green-500">
              +{transaction.amount}
            </h1>
          ) : (
            <h1 className="text-3xl font-medium text-red-500">
              -{transaction.amount}
            </h1>
          )}
          <div className="text-lg text-gray-800">
            <h1>{transaction.createdAt.slice(0, 10)}</h1>
          </div>
        </div>
      ))}
    </>
  );
};

export default Transactions;
