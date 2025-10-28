import { api } from "./api";

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {},
});

export const { useGetCharaktereQuery } = enhancedApi;
