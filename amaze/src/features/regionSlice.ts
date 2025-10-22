import { createSlice } from "@reduxjs/toolkit";

export interface Region {
  name: string;
  count: number;
  color: string;
  icons : "GiWorld"; // store only a key to represent the icon
}

interface RegionsState {
  regions: Region[];
}

const initialState: RegionsState = {
  regions: [
    { name: "Africa", count: 54, color: "bg-gradient-to-r from-orange-800 to-red-800", icons: "GiWorld" },
    { name: "Americas", count: 35, color: "bg-gradient-to-r from-green-800 to-emerald-800", icons: "GiWorld" },
    { name: "Asia", count: 48, color: "bg-gradient-to-r from-yellow-800 to-amber-800", icons: "GiWorld" },
    { name: "Europe", count: 44, color: "bg-gradient-to-r from-blue-800 to-indigo-800", icons: "GiWorld" },
    { name: "Oceania", count: 14, color: "bg-gradient-to-r from-purple-800 to-violet-800", icons: "GiWorld" },
  ],
};

const regionsSlice = createSlice({
  name: "regions",
  initialState,
  reducers: {},
});

export default regionsSlice.reducer;
