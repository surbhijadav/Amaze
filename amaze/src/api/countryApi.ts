// src/api/factsApi.ts

export const BASE_URL = "https://restcountries.com/v3.1";

// Define Fact type
export type Fact = {
  name: { common: string };   // name object from API
  capital?: string[];
  population: number;
  region: string;
  flags: { png: string; svg: string };
};

// GET all countries (facts)
export const getFacts = async (): Promise<Fact[]> => {
  const res = await fetch(
    `${BASE_URL}/all?fields=name,population,region,capital,flags`
  );
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
};

// GET country by name
export const getCountryByName = async (name: string) => {
  const res = await fetch(
    `${BASE_URL}/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
  );
  if (!res.ok) throw new Error("Failed to fetch country");
  return res.json();
};
