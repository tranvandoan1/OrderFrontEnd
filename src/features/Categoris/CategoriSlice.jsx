import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CateAPI, { add, remove, uploadCate } from "../../API/CateAPI";
export const getCategori = createAsyncThunk(
  "categori/getCategori",
  async () => {
    const { data: categoris } = await CateAPI.getAll();
    return categoris;
  }
);
export const addCategori = createAsyncThunk(
  "categori/addCategori",
  async (data) => {
    await add(data);
  }
);
export const removeCategori = createAsyncThunk(
  "categori/removeCategori",
  async (data) => {
    await remove(data._id);
    const { data: categoris } = await CateAPI.getAll();
    return categoris.filter((item) => item._id !== data._id);
  }
);
export const uploadCategori = createAsyncThunk(
  "categori/uploadCategori",
  async (id,data) => {
    console.log(id,data)
    // await uploadCate(id,data);
    // const { data: categoris } = await CateAPI.getAll();
    // return categoris.filter((item) => item._id !== data._id);
  }
);
const categoriSlice = createSlice({
  name: "categori",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategori.fulfilled, (state, action) => {
      state.value = action.payload;
    }),
      builder.addCase(removeCategori.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});
export default categoriSlice.reducer;
