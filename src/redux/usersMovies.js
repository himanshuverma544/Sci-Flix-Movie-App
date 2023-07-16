import { createSlice } from "@reduxjs/toolkit";

import { DEFAULT_USER } from "../constants";


const usersMoviesSlice = createSlice({
  name: "usersMovies",
  initialState: {
    [DEFAULT_USER.username]: []
  },
  reducers: {
    addNewUser(state, action) {
      return {
        ...state,
        [action.payload.username]: []
      }
    },
    loadMovies(state, action) {
      return {
        ...state,
        [action.payload.username]: action.payload.movies
      }
    },
    editMovie(state, action) {
      return {
        ...state,
        [action.payload.username]: state[action.payload.username].map(
          movie => (movie.id === action.payload.id ? {...movie, rating: action.payload.userGivenRating } : movie)
        )
      };
    },
    deleteMovie(state, action) {
      return {
        ...state,
        [action.payload.username]: state[action.payload.username].filter(
          movie => movie.id !== action.payload.id
        )
      };
    }
  }
});

export const { addNewUser, loadMovies, editMovie, deleteMovie } = usersMoviesSlice.actions;
export default usersMoviesSlice.reducer;