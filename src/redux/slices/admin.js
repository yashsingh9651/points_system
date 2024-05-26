import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching users
export const fetchUsers = createAsyncThunk("fetchUsers", async (adminEmail) => {
  const response = await axios.post("/api/admin/users", { adminEmail });
  return response.data;
});
// Fetching transaction
export const fetchTransactions = createAsyncThunk(
  "fetchTransactions",
  async (adminEmail) => {
    const response = await axios.post("/api/admin/transactions", {
      adminEmail,
    });
    return response.data;
  }
);
// Fetching Products
export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (adminEmail) => {
    const response = await axios.post("/api/admin/product", { adminEmail });
    return response.data;
  }
);
export const admin = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    allTransactions: [],
    products: [],
    searchedProducts: [],
    boxdetails: {},
    // Adding to Billing List
    showAddToListBox: false,
    addToListboxdetail: {},
    billProdList: [],
    subTotal: 0,
    showBox: false,
    billNumber: 0,
    date: "",
  },
  reducers: {
    newBillNumber: (state) => {
      state.billNumber = `Bill-${Date.now()}`;
      const date = new Date();
      const day = date.getDate();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      state.date = `${day} ${month} ${year}`;
    },
    showBox: (state, action) => {
      state.showBox = !state.showBox;
      state.boxdetails = action?.payload;
    },
    addToList: (state, action) => {
      const { name, sellPrice, quantity } = action.payload;
      Number(quantity);
      state.billProdList.push({
        name,
        sellPrice,
        quantity,
        billNumber: state.billNumber,
      });
      state.showAddToListBox = false;
      state.searchedProducts = [];
      let total = 0;
      state.billProdList.forEach((prod) => {
        total += Number(prod.quantity) * Number(prod.sellPrice);
      });
      state.subTotal = total;
    },
    showAddToListBox: (state, action) => {
      state.showAddToListBox = !state.showAddToListBox;
      state.addToListboxdetail = action?.payload;
    },
    removeProdFromBillProdList: (state, action) => {
      const index = state.billProdList.findIndex((prod) => {
        return prod._id === action.payload;
      });
      if (index === 0) {
        state.billProdList.shift();
      } else {
        state.billProdList.splice(index, 1);
      }
    },
    calSubTotal: (state) => {
      let total = 0;
      state.billProdList.forEach((prod) => {
        total += Number(prod.quantity) * Number(prod.sellPrice);
      });
      state.subTotal = total;
    },
    searchProductsList: (state, action) => {
      const search = action.payload;
      if (search.length <= 1 || search == "") {
        state.searchedProducts = [];
      } else {
        const filteredProducts = state.products?.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
        state.searchedProducts = filteredProducts;
      }
    },
    resetBill: (state) => {
      state.billProdList = [];
      state.addToListboxdetail = {};
      state.subTotal = 0;
      state.billNumber = `Bill-${Date.now()}`;
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

export const {
  showBox,
  addToList,
  showAddToListBox,
  removeProdFromBillProdList,
  calSubTotal,
  searchProductsList,
  newBillNumber,
  resetBill,
} = admin.actions;
