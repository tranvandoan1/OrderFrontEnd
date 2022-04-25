import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FloorAPI, { addOder, remove } from "../../API/FloorAPI";
export const getFloor = createAsyncThunk(
    "floor/getFloor",
    async () => {
        const { data: floor } = await FloorAPI.getAll()
        return floor
    }
)
export const removeFloor = createAsyncThunk(
    "floor/removeFloor",
    async (id) => {
        await remove(id)
        const { data: floor } = await FloorAPI.getAll()
        return floor
    }
)
export const addFloor = createAsyncThunk(
    "floor/addFloor",
    async (floor) => {
        const { data } = await addOder(floor)
        return data
    }
)

const floorSlice = createSlice({
    name: 'floor',
    initialState: {
        value: []
    },
    reducers: {
  
    },
    extraReducers: (builder) => {
        builder.addCase(getFloor.fulfilled, (state, action) => {
            state.value = action.payload
        })

        builder.addCase(removeFloor.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(addFloor.fulfilled, (state, action) => {
            state.value.push(action.payload)
        })

    }
})
export default floorSlice.reducer