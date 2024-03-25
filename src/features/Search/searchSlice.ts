import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { movieAPI, type Movie } from "../../entities/Movies";

export interface ListMoviesState {
  items: Movie[],
  response: "True" | "False",
  status: "idle" | "loading" | "failed",
}

const initialState: ListMoviesState = {
  items: [],
  response: "True",
  status: "idle",
};

export const fetchListMovies = createAsyncThunk(
  "search/fetchListMovies",
  async (name: string) => {
    const response = await movieAPI.fetchListMovies(name);
    return response;
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset(state) {
      state.items = [];
      state.response = "True";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListMovies.fulfilled, (state, action) => {
        if (action.payload.Response === "True") {
          state.items = action.payload.Search;
        }
        state.response = action.payload.Response;
        state.status = "idle";
      })
      .addCase(fetchListMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectListMovies = (state: RootState) => state.search.items;
export const selectResponse = (state: RootState) => state.search.response;
export const selectStatus = (state: RootState) => state.search.status;

export const { reset } = searchSlice.actions;

export default searchSlice.reducer;