import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Fetching users
export const fetchUsers = createAsyncThunk("fetchUsers", async (adminEmail) => {
    const response = await axios.post("/api/admin/users", { adminEmail });
    return response.data;
});
// Fetching transaction
export const fetchTransactions = createAsyncThunk("fetchTransactions", async (adminEmail) => {
  const response = await axios.post("/api/admin/transactions", { adminEmail });
  return response.data;
});
// Fetching Products
export const fetchProducts = createAsyncThunk("fetchProducts", async (adminEmail) => {
  const response = await axios.post("/api/admin/product", { adminEmail });
  return response.data;
});

export const admin = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    allTransactions: [],
    showAddToListBox:false,
    addToListboxdetail:{},
    products: [],
    billProdList: [],
    subTotal:0,
    showBox: false,
    boxdetails:{},
  },
  reducers: {
    showBox: (state, action) => {
      state.showBox = !state.showBox;
      state.boxdetails = action?.payload;
    },
    addToList:(state, action) => {
      state.billProdList.push(action.payload);
      state.showAddToListBox = false;
      let total =0;
      state.billProdList.forEach((prod) => {
        total += (Number(prod.quantity) * Number(prod.price))
      });
      state.subTotal = total;
    },
    showAddToListBox:(state,action) => {
      state.showAddToListBox = !state.showAddToListBox
      state.addToListboxdetail= action?.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload.users;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.allTransactions = action.payload.transactions;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.products;
    });
  },
});

export const {showBox,addToList,showAddToListBox}= admin.actions;