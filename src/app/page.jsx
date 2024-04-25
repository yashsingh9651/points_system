"use client";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Profile from "@/components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "@/redux/slices/user";
import Transactions from "@/components/Transactions";
import Feed from "@/skeleton/Feed";

export default function Home() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  // Fetching Products from sanity
  const [products, setProducts] = useState([]);
  const [isProFetched, setIsProFetched] = useState(false);
  const fetchProducts = async () => {
    const res = await client.fetch(`*[_type == "Products"]`);
    setProducts(res);
    setIsProFetched(true);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  // Converting Sanity Image Coded Content to Url
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  // Fetching Transactions
  useEffect(() => {
    if (window.innerWidth > 500) {
      dispatch(getTransactions({ email: userData.email }));
    }
  }, [userData?.points]);
  return (
    <>
      <div className="grid xl:grid-cols-Hero gap-6 h-screen w-screen pt-16 lg:pt-24 px-6">
        {/* Transcation Section */}
        <div className="h-full relative hidden xl:block">
          <div className="sticky top-16 lg:top-24 flex flex-col gap-4 p-2">
            <Transactions />
          </div>
        </div>
        {/* Feeds Section */}
        <div className="h-full pb-6">
          <h1 className="text-2xl font-semibold mb-6 text-center font-sans">
            New Arrivals
          </h1>
          {!isProFetched ? (
            <Feed />
          ) : (
            <div className=" flex flex-col gap-6 items-center">
              {products.map((product) => (
                <div
                  className="md:w-[400px] w-[300px] border pb-2 border-gray-100 rounded-lg shadow"
                  key={product._id}
                >
                  <img
                    className="w-full aspect-square rounded-lg object-cover border-b border-gray-400"
                    src={urlFor(product.image).url()}
                    alt="photo"
                  />
                  <h1 className="p-2 text-lg font-semibold capitalize">
                    {product.brand} {product.name}
                  </h1>
                  <h1 className="px-2 text-lg">₹ {product.price}</h1>
                  <h1 className="px-2 text-base">{product.description}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Profile Section */}
        <div className="h-full relative hidden xl:block">
          <div className=" sticky top-16 lg:top-24 flex flex-col items-center gap-5">
            <h1 className="text-2xl font-semibold text-center font-sans">
              Profile
            </h1>
            <Profile />
          </div>
        </div>
      </div>
    </>
  );
}
