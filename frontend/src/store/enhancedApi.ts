import { api } from "./api";

export const enhancedApi = api.enhanceEndpoints({
  endpoints: {},
});

export const {
  useGetCharactersQuery,
  useGetCharacterQuery,
  useCreateCharacterMutation,
} = enhancedApi;
