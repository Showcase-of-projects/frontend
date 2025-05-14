import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosInstance";
import { STATUS } from "../../constants.js";

export const login = createAsyncThunk("api/v1/auth/login", async (params) => {
  const response = await api.post(
    `api/v1/auth/authenticate?login=${params.login}&password=${params.password}`
  );
  return response;
});

export const signup = createAsyncThunk(
  "api/v1/auth/register",
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
  status: STATUS.PENDING,
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
      .addCase(login.pending, (state) => {
        state.data = null;
        state.status = STATUS.PENDING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(login.rejected, (state) => {
        state.data = null;
        state.status = STATUS.REJECTED;
      })
      .addCase(signup.pending, (state) => {
        state.data = null;
        state.status = STATUS.PENDING;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.FULFILLED;
      })
      .addCase(signup.rejected, (state) => {
        state.data = null;
        state.status = STATUS.REJECTED;
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const { logout } = authSlice.actions;
export default authSlice.reducer;