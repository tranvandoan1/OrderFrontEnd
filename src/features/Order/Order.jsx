import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderAPI from "../../API/Order";
import { remove } from "../../API/Order";
export const getOrder = createAsyncThunk("order/getOrder", async () => {
  const { data: orders } = await OrderAPI.getAll();
  return orders;
});
export const removeOrder = createAsyncThunk("oder/removeOrder", async (id) => {
  await remove(id);
  const { data: orders } = await OrderAPI.getAll();
  return orders;
});
const orderSlice = createSlice({
  name: "order",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(removeOrder.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default orderSlice.reducer;
