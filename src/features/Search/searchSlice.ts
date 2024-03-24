import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { movieAPI, type Movie } from "../../entities/Movies";

export interface ListMoviesState {
  items: Movie[],
  status: "idle" | "loading" | "failed",
}

const initialState: ListMoviesState = {
  items: [],
  status: "idle",
};

export const fetchListMovies = createAsyncThunk(
  "search/fetchListMovies",
  async (name: string) => {
    const response = await movieAPI.fetchListMovies(name);
    return response.Search;
  },
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    reset(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchListMovies.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectListMovies = (state: RootState) => state.search.items;

export const { reset } = searchSlice.actions;

export default searchSlice.reducer;