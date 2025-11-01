// src/api/factsApi.ts

export const BASE_URL = "https://restcountries.com/v3.1";

// Define Fact type
// src/api/countryApi.ts

export interface Fact {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  region: string;
  subregion?: string;
  capital?: string[];
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  tld?: string[];
  timezones?: string[];
  borders?: string[];
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
}


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
