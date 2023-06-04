import { configureStore } from "@reduxjs/toolkit";

import usersMoviesReducer from "./usersMovies";
import usersReducer from "./users";
import moviesCommentsReducer from "./moviesComments";

const store = configureStore({
  reducer: {
    usersMoviesReducer,
    usersReducer,
    moviesCommentsReducer
  }
});

export default store;