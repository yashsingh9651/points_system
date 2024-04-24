"use client";
import TranSkeleton from "@/skeleton/TranSkeleton";
import React from "react";
import { useSelector } from "react-redux";

const Transactions = () => {
  const isTransFetched = useSelector((state) => state.user.isTransFetched);
  const transactions = useSelector((state) => state.user.transactions);
  return (
    <>
      <h1 className="text-2xl font-semibold text-center font-sans">
        Transcations
      </h1>
      {isTransFetched ? (
        <div>
          {transactions.length !== 0 ? (
            <div className="flex items-center flex-col gap-5">
              {transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex gap-5 md:w-2/3 xl:w-full items-center justify-between border border-gray-300 shadow-md rounded-md p-3 w-full"
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
            </div>
          ) : (
            <h1 className="text-center text-lg text-gray-600">
              No Transactions Yet
            </h1>
          )}
        </div>
      ) : (
        <TranSkeleton />
      )}
    </>
  );
};

export default Transactions;
