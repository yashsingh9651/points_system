"use client";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url'
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
    return builder.image(source)
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="mt-40">
        <h1>Add Product</h1>
        {products.map((product) => {
          return (
            <div key={product._id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.stock}</p>
              <p>{product.brand}</p>
              <img src={urlFor(product.image).url()} alt={product.image.asset._ref} />
            </div>
          );
        })}
      </div>
    </>
  );
}
