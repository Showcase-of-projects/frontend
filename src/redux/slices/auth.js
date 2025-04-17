import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosInstance";


export const login = createAsyncThunk("/api/v1/auth/login", async (params) => {
    const response = await api.post(
      `api/v1/auth/authenticate?login=${params.login}&password=${params.password}`
    );
    return response;
  });

  export const signup = createAsyncThunk(
    "/api/v1/auth/register",
    async (params) => {
      console.log("params", params.name);
      const response = await api.post(
        `/api/v1/auth/register`,
        params
      );
      return response;
    }
  );

  const initialState = {
    data: null,
  };
  
  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        localStorage.removeItem("token");
        state.data = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.fulfilled, (state, action) => {
          state.data = action.payload;
        })
        .addCase(login.rejected, (state) => {
          state.data = null;
        })
  
        .addCase(signup.fulfilled, (state, action) => {
          state.data = action.payload.data; 
          state.status = "loaded";
        })
        .addCase(signup.rejected, (state) => {
          state.data = null;
        })
    },
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;