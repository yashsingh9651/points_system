import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
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
    loading: false,
    isLogedIn: false,
    userData: {},
    transactions: [],
  },
  reducers: {
    logout: (state, action) => {
      state.isLogedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
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
    });
  },
});
export const { logout } = user.actions;
