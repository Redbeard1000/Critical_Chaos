import { baseApi } from "./baseApi";

export const api = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCharaktere: build.query<{ name: string; klasse: string }[], void>({
      query: () => ({
        url: "/charaktere",
        method: "GET",
      }),
    }),
  }),
});
