import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMovie } from "../models/IMovie";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  tagTypes: ["Movies"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  endpoints: (build) => ({
    getMovies: build.query<IMovie[], number>({
      query: (limit: number) => `movies?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Movies" as const, id })),
              { type: "Movies", id: "LIST" },
            ]
          : [{ type: "Movies", id: "LIST" }],
    }),
    getFavouriteMovies: build.query<IMovie[], number>({
      query: (limit: number) => `favourites?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Movies" as const, id })),
              { type: "Movies", id: "LIST" },
            ]
          : [{ type: "Movies", id: "LIST" }],
    }),
    addFavouriteMovies: build.mutation<IMovie, IMovie>({
      query: (body) => ({
        url: "favourites",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),
    deleteFavouriteMovies: build.mutation<IMovie, number>({
      query: (id: number) => ({
        url: `favourites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),
    getWatchLaterMovies: build.query<IMovie[], number>({
      query: (limit: number) => `watch-later?${limit && `_limit=${limit}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Movies" as const, id })),
              { type: "Movies", id: "LIST" },
            ]
          : [{ type: "Movies", id: "LIST" }],
    }),
    addWatchLaterMovies: build.mutation<IMovie, IMovie>({
      query: (body) => ({
        url: "watch-later",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),
    deleteWatchLaterMovies: build.mutation<IMovie, number>({
      query: (id: number) => ({
        url: `watch-later/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Movies", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetFavouriteMoviesQuery,
  useGetWatchLaterMoviesQuery,
  useAddFavouriteMoviesMutation,
  useAddWatchLaterMoviesMutation,
  useDeleteFavouriteMoviesMutation,
  useDeleteWatchLaterMoviesMutation,
} = moviesApi;
