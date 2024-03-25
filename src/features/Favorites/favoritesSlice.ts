import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { type Movie } from "../../entities/Movies";

export interface FavoritesState {
  movies: Movie[],
}

const initialState: FavoritesState = {
  movies: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addMovie(state, action: PayloadAction<Movie>) {
      if (!state.movies.some(movie => action.payload.imdbID === movie.imdbID)) {
        state.movies.push(action.payload);
      }
    },
    removeMovie(state, action: PayloadAction<Movie>) {
      state.movies = state.movies.filter(movie => movie.imdbID !== action.payload.imdbID);
    },
  },
});

export const selectFavorites = (state: RootState) => state.favorites.movies;

export const { addMovie, removeMovie } = favoritesSlice.actions;

export default favoritesSlice.reducer;