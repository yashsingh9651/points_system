"use client";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
// import { useDispatch, useSelector } from "react-redux";

export default function Home() {
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
  return (
    <>
    <h1 className="text-2xl font-semibold mt-16 lg:mt-24 text-center underline underline-offset-4">New Arrivals</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 justify-items-center">
        {products.map((product) => (
          <div
            className="w-[330px] border pb-2 border-gray-100 rounded-lg shadow-md"
            key={product._id}
          >
            <img
              className="w-[330px] h-[400px] rounded-lg object-cover border-b border-gray-400"
              src={urlFor(product.image).url()}
              alt="photo"
            />
            <h1 className="p-2 text-lg font-semibold capitalize">
              {product.brand} {product.name}
            </h1>
            <h1 className="px-2 text-lg">₹ {product.price}</h1>
            <h1 className="px-2 text-base font-medium">{product.description}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
