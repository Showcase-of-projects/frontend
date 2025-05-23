import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosInstance";

export const addTeamData = createAsyncThunk(
  "team/addTeamData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/teams/create", {});
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка при создании команды"
      );
    }
  }
);

export const fetchActiveTeam = createAsyncThunk(
  "team/fetchActiveTeam",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/teams/user-active-team/get");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Ошибка при загрузке команды"
      );
    }
  }
);

export const setTeamTopic = createAsyncThunk(
  "team/setTeamTopic",
  async (topicId, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/teams/set-topic?id=${topicId}`,
        {}, // пустое тело запроса
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Full error:", error); 
      console.error("Response data:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        "Ошибка при установке темы"
      );
    }
  }
);


const teamSlice = createSlice({
  name: "team",
  initialState: {
    team: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTeam(state) {
      state.team = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTeamData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTeamData.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(addTeamData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при создании команды";
      })
       .addCase(fetchActiveTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
        console.log("Team data saved to store:", action.payload);
      })
      .addCase(fetchActiveTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(setTeamTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setTeamTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.team = action.payload;
      })
      .addCase(setTeamTopic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearTeam } = teamSlice.actions;

export default teamSlice.reducer;
