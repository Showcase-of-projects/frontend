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

export const fetchTopicById = createAsyncThunk(
  "topics/fetchTopicById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/topics/get/${id}`);
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
    selectedTopic: null,
    departments: [],
    projectTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.topics = action.payload;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(fetchProjectTypes.fulfilled, (state, action) => {
        state.projectTypes = action.payload;
      })
      .addCase(fetchTopicById.fulfilled, (state, action) => {
        state.selectedTopic = action.payload;
      });
  },
});


export default topicsSlice.reducer;
