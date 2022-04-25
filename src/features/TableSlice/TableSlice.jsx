import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TableAPI, { addOder, remove } from "../../API/TableAPI";
export const getTable = createAsyncThunk(
    "table/getTable",
    async () => {
        const { data: table } = await TableAPI.getAll()
        return table
    }
)
export const removeTable = createAsyncThunk(
    "table/removeTable",
    async (id) => {
        await remove(id)
        const { data: table } = await TableAPI.getAll()
        return table
    }
)
export const addTable = createAsyncThunk(
    "table/addTable",
    async (table) => {
        const { data } = await addOder(table)
        return data
    }
)

const tableSlice = createSlice({
    name: 'table',
    initialState: {
        value: []
    },
    reducers: {
  
    },
    extraReducers: (builder) => {
        builder.addCase(getTable.fulfilled, (state, action) => {
            state.value = action.payload
        })

        builder.addCase(removeTable.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(addTable.fulfilled, (state, action) => {
            state.value.push(action.payload)
        })

    }
})
export default tableSlice.reducer