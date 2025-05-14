import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../axiosInstance";


  export const addTeamData = createAsyncThunk(
    "team/addTeamData",
    async (teamData, { rejectWithValue }) => {
      try {
        const response = await api.post("/teams/create", teamData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Ошибка при создании команды");
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
        });
    },
  });
  
  export const { clearTeam } = teamSlice.actions;
  
  export default teamSlice.reducer;
  