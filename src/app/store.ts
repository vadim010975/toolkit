import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/Search/searchSlice";
import favoritesReducer from "../features/Favorites/favoritesSlice";
import cardReducer from "../features/Card/cardSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    favorites: favoritesReducer,
    card: cardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;