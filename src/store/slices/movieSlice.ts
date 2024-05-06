import { Reducer, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../../models/IMovie";
import { PayloadAction } from "@reduxjs/toolkit/react";

interface InitialStateProps {
  movies: IMovie[];
}
const initialState: InitialStateProps = {
  movies: [],
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addSearchedMovies(state, action: PayloadAction<IMovie[]>) {
      state.movies = action.payload;
    },
    sortMoviesByHighestRating(state) {
      state.movies.sort((a, b) => b.rating - a.rating);
    },
    sortMoviesByLowestRating(state) {
      state.movies.sort((a, b) => a.rating - b.rating);
    },
  },
});

export const {
  addSearchedMovies,
  sortMoviesByHighestRating,
  sortMoviesByLowestRating,
} = movieSlice.actions;
export default movieSlice.reducer as Reducer<typeof initialState>;
