"use client";
import {
  addToRestockList,
  removeProdFromBillProdList,
  showAddToListBox,
} from "@/redux/slices/admin";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToRestockListBox = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.admin.addToListboxdetail);
  const [newProduct, setNewProduct] = useState(product);
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: Number(e.target.value) });
  };
  return (
    <div className="w-screen h-screen absolute top-0 z-50 left-0 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 w-11/12 lg:w-2/5 rounded-md border border-black">
        <h1 className="text-2xl font-semibold text-center underline underline-offset-4">
          Add to List
        </h1>
        <form className="flex flex-col gap-4 justify-center mt-5">
          <h1 className="text-lg font-semibold">
            Product Name : {product.name}
          </h1>
          <div>
            Quantity :
            <input
              onChange={handleChange}
              name="quantity"
              type="number"
              autoFocus="true"
              placeholder="Enter Quantity"
              value={newProduct.quantity}
              className="p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            Selling Price :
            <input
              onChange={handleChange}
              type="number"
              name="sellPrice"
              placeholder="Enter Price"
              value={newProduct.sellPrice}
              className="p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            Buying Price :
            <input
              onChange={handleChange}
              type="number"
              name="buyPrice"
              placeholder="Enter Buying Price"
              value={newProduct.buyPrice}
              className="p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            MRP :
            <input
              onChange={handleChange}
              type="number"
              name="MRP"
              placeholder="Enter MRP"
              value={newProduct.MRP}
              className="p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div>
            Discount :
            <input
              onChange={handleChange}
              type="number"
              name="discount"
              placeholder="Enter discount"
              value={newProduct.discount}
              className="p-2 border border-gray-400 rounded-md"
            />
          </div>
          <div className="flex justify-end gap-8">
            <button
              onClick={() => {
                if (product._id === undefined) {
                  dispatch(removeProdFromBillProdList(product.name));
                }
                dispatch(addToRestockList(newProduct));
              }}
              className="p-2 bg-green-500 hover:bg-green-700 hover:scale-105 duration-200 text-white rounded-md"
            >
              Add Product
            </button>
            <button
              onClick={() => dispatch(showAddToListBox())}
              className="p-2 bg-red-400 hover:bg-red-700 hover:scale-105 duration-200 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToRestockListBox;
