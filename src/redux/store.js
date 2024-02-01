import { configureStore } from "@reduxjs/toolkit";

import usersMoviesReducer from "./slices/usersMovies";
import usersReducer from "./slices/users";
import moviesCommentsReducer from "./slices/moviesComments";

const store = configureStore({
  reducer: {
    usersMoviesReducer,
    usersReducer,
    moviesCommentsReducer
  }
});

export default store;