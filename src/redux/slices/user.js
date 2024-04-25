import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// Fetching users and transaction for Admin
export const fetchData = createAsyncThunk("fetchData", async (email) => {
  const response = await axios.post("/api/admin", { email });
  return response.data;
});
// Fetching UserData
export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  const response = await axios.get("/api/users/userData");
  return response.data;
});

// Adding Transcations
export const addTranscations = createAsyncThunk(
  "addTranscations",
  async (data) => {
    const response = await axios.post("/api/transaction/add", data);
    return response.data;
  }
);
// Fetch transactions
export const getTransactions = createAsyncThunk(
  "getTransactions",
  async (data) => {
    const response = await axios.post("/api/transaction/getData", data);
    return response.data;
  }
);

export const user = createSlice({
  name: "user",
  initialState: {
    isUserFetched: false,
    isLogedIn: false,
    isTransFetched: false,
    userData: {},
    transactions: [],
    // For Admin Pages
    allUsers: [],
    allTransactions: [],
    Loading: false,
  },
  reducers: {
    logout: (state, action) => {
      state.isLogedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isUserFetched = true;
      state.userData = action.payload.user;
      if (action.payload.success) {
        state.isLogedIn = true;
      }
    });
    builder.addCase(addTranscations.fulfilled, (state, action) => {
      toast.success(action.payload.message);
      state.userData = action.payload.userData;
    });
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload.transactions;
      state.isTransFetched = true;
    });
    builder
      .addCase(fetchData.pending, (state) => {
        state.Loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.allUsers = action.payload.users;
        state.allTransactions = action.payload.transactions;
        state.Loading = false;
      });
  },
});
export const { logout } = user.actions;
