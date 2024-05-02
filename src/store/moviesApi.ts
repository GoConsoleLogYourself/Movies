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
  }),
});

export const { useGetMoviesQuery } = moviesApi;
