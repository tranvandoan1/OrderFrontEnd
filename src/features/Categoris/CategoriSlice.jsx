import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CateAPI from '../../API/CateAPI'
export const getCategori = createAsyncThunk(
    'categori/getCategori',
    async () => {
        const { data: categoris } = await CateAPI.getAll()
        return categoris
    }
)
const categoriSlice = createSlice({
    name: 'categori',
    initialState: {
        value: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getCategori.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
})
export default categoriSlice.reducer