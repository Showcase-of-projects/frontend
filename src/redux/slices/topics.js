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

export const fetchDepartments = createAsyncThunk(
  "topics/fetchDepartments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/departments/get");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchProjectTypes = createAsyncThunk(
  "topics/fetchProjectTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/types/get");
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
    departments: [],
    projectTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(fetchProjectTypes.fulfilled, (state, action) => {
        state.projectTypes = action.payload;
      });
  },
});


export default topicsSlice.reducer;
