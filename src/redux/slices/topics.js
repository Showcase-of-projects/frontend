import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosInstance";

export const fetchTopics = createAsyncThunk(
  "topics/fetchTopics", 
  async ({ name, departmentId, typeId }, { rejectWithValue }) => {
    try {
      const response = await api.get("/topics/get", {
        params: { name, departmentId, typeId }, 
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const topicsSlice = createSlice({
  name: "topics",
  initialState: {
    topics: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTopics } = topicsSlice.actions;
export default topicsSlice.reducer;
