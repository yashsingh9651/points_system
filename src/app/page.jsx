"use client";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Profile from "@/components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "@/redux/slices/user";

export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const transactions = useSelector((state) => state.user.transactions);
  // Fetching Products from sanity
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const res = await client.fetch(`*[_type == "Products"]`);
    setProducts(res);
  };
  // Converting Sanity Image Coded Content to Url
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  // Fetching Transactions
  useEffect(() => {
    dispatch(
      getTransactions({ email: userData.email, shopName: userData.shopName })
    );
  }, [userData.email]);
  return (
    <>
      <div className="grid lg:grid-cols-Hero gap-6 h-screen w-screen pt-16 lg:pt-24 px-6">
        {/* Transcation Section */}
        <div className="h-full relative hidden lg:block">
          <div className="sticky top-16 lg:top-24 flex flex-col gap-4 p-2">
            <h1 className="text-2xl font-semibold text-center font-sans">
              Transcations
            </h1>
            {/* Maping Transaction Details */}
            {/* <div className="flex gap-5 items-center justify-between border border-gray-300 shadow-lg rounded-md p-3">
              <h1 className="text-3xl font-medium text-green-500">+200</h1>
              <div className="text-lg text-gray-800 text-end">
                <h1>Bill Number 13</h1>
                <h1>1 Dec 2023</h1>
              </div>
            </div> */}
            {transactions.map((transaction) => (
              <div key={transaction._id} className="flex gap-5 items-center justify-between border border-gray-300 shadow-lg rounded-md p-3">
                {transaction.type!=="DEBIT"?<h1 className="text-3xl font-medium text-green-500">+{transaction.amount}</h1>:
                <h1 className="text-3xl font-medium text-red-500">-{transaction.amount}</h1>}
                <div className="text-lg text-gray-800">
                  <h1>{transaction.createdAt.slice(0,10)}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Feeds Section */}
        <div className="h-full flex flex-col gap-6 items-center pb-6">
          <h1 className="text-2xl font-semibold text-center font-sans">
            New Arrivals
          </h1>
          {products.map((product) => (
            <div
              className="md:w-[400px] w-[300px] border pb-2 border-gray-100 rounded-lg shadow-md"
              key={product._id}
            >
              <img
                className="md:w-[400px] w-[300px] aspect-square rounded-lg object-cover border-b border-gray-400"
                src={urlFor(product.image).url()}
                alt="photo"
              />
              <h1 className="p-2 text-lg font-semibold capitalize">
                {product.brand} {product.name}
              </h1>
              <h1 className="px-2 text-lg">₹ {product.price}</h1>
              <h1 className="px-2 text-base font-medium">
                {product.description}
              </h1>
            </div>
          ))}
        </div>
        {/* Profile Section */}
        <div className="h-full relative hidden lg:block">
          <div className=" sticky top-16 lg:top-24 flex flex-col items-center gap-5">
            <h1 className="text-2xl font-semibold text-center font-sans">
              Profile
            </h1>
            <Profile userData={userData} />
          </div>
        </div>
      </div>
    </>
  );
}