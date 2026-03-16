import { baseApi } from "./baseApi";

export type CharacterPayload = {
  name: string;
  klasse?: string | null;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  empathy?: number;
  level?: number;
  // Strength skills
  might?: number;
  endurance?: number;
  melee?: number;
  crafting?: number;
  // Dexterity skills
  stealth?: number;
  sleightOfHand?: number;
  move?: number;
  ranged?: number;
  // Intelligence skills
  knowledge?: number;
  survival?: number;
  insight?: number;
  // Empathy skills
  manipulation?: number;
  performance?: number;
  healing?: number;
  animalHandling?: number;
  metadata?: Record<string, unknown> | null;
};

export type Character = CharacterPayload & {
  id: number;
};

export const api = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCharacters: build.query<Character[], void>({
      query: () => ({
        url: "/api/characters",
        method: "GET",
      }),
    }),
    getCharacter: build.query<Character, string | number>({
      query: (id) => ({
        url: `/api/characters/${id}`,
        method: "GET",
      }),
    }),
    createCharacter: build.mutation<Character, CharacterPayload>({
      query: (body) => ({
        url: "/api/characters",
        method: "POST",
        body,
      }),
    }),
  }),
});
