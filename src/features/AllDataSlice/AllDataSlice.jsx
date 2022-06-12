import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CateAPI from "../../API/CateAPI";
import OrderAPI from "../../API/Order";
import TableAPI from "../../API/TableAPI";
import ProAPI from "../../API/ProAPI";
import FloorAPI from "../../API/FloorAPI";

export const getAll = createAsyncThunk("all/getAll", async () => {
  const { data: products } = await ProAPI.getAll();
  const { data: categoris } = await CateAPI.getAll();
  const { data: orders } = await OrderAPI.getAll();
  const { data: tables } = await TableAPI.getAll();
  const { data: floors } = await FloorAPI.getAll();
  const allData = {
    products: products,
    categoris: categoris,
    orders: orders,
    tables: tables,
    floors: floors,
  };
  return allData
});
const allDataSlice = createSlice({
  name: "allData",
  initialState: {
    value: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default allDataSlice.reducer;
