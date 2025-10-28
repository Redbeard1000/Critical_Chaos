import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});
export type BaseQuery = typeof baseQuery;

export const baseApi = createApi({
  reducerPath: "backend",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
