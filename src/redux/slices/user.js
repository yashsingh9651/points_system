import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetching UserData
export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  const response = await axios.get("/api/users/userData");
  return response.data;
});

export const user = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isLogedIn: false,
    userData: {},
  },
  reducers: {
    logout: (state,action) => {
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
  },
});
export const { logout } = user.actions;
