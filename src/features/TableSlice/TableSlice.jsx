import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TableAPI, { addTable, remove, uploadTable } from "../../API/TableAPI";
export const getTable = createAsyncThunk("table/getTable", async () => {
  const { data: table } = await TableAPI.getAll();
  return table;
});
export const removeTable = createAsyncThunk("table/removeTable", async (id) => {
  await remove(id);
  const { data: table } = await TableAPI.getAll();
  return table;
});
export const addTablee = createAsyncThunk("table/addTable", async (table) => {
  const { data } = await addTable(table);
  return data;
});

export const editTable = createAsyncThunk("table/editTable", async (data) => {
  await uploadTable(data._id, data);
  const { data: table } = await TableAPI.getAll();
  return table;
});
const tableSlice = createSlice({
  name: "table",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTable.fulfilled, (state, action) => {
      state.value = action.payload;
    });

    builder.addCase(removeTable.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addTablee.fulfilled, (state, action) => {
      state.value.push(action.payload);
    });
    builder.addCase(editTable.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default tableSlice.reducer;
