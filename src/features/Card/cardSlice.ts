import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { movieAPI, type CardMovie } from "../../entities/Movies";

export interface cardState {
  card: CardMovie,
  status: "idle" | "loading" | "failed",
}

const initialState: cardState = {
  card: {
    poster: "",
    title: "",
    year: "",
    genre: "",
    runtime: "",
    director: "",
    actors: "",
    imdbRating: "",
    response: "True",
  },
  status: "idle",
};

export const fetchCardMovie = createAsyncThunk(
  "card/fetchCardMovie",
  async (imdbID: string) => {
    const response = await movieAPI.fetchCardMovie(imdbID);
    return {
      title: response.Title,
      year: response.Year,
      genre: response.Genre,
      runtime: response.Runtime,
      director: response.Director,
      actors: response.Actors,
      imdbRating: response.imdbRating,
      poster: response.Poster,
      response: response.Response,
    } as CardMovie;
  },
);

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    clear(state) {
      state.card = initialState.card;
      state.status = initialState.status;
      }
    },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCardMovie.fulfilled, (state, action) => {
        state.card = action.payload;
        state.status = "idle";
      })
      .addCase(fetchCardMovie.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCard = (state: RootState) => state.card.card;
export const selectCardStatus = (state: RootState) => state.card.status;

export const { clear } = cardSlice.actions;

export default cardSlice.reducer;