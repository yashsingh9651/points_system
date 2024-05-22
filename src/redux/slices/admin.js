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
  const response = await axios.post("/api/admin/product/getProducts", { adminEmail });
  return response.data;
});

export const admin = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    allTransactions: [],
    products: [],
    showBox: false,
    boxdetails:{},
  },
  reducers: {
    showBox: (state, action) => {
      state.showBox = !state.showBox;
      state.boxdetails = action?.payload;
    },
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

export const {showBox}= admin.actions;