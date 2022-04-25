import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderAPI from "../../API/Order";
export const getOrder = createAsyncThunk(
    'order/getOrder',
    async () => {
        const { data: orders } = await OrderAPI.getAll()
        return orders
    }
)
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        value: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
})
export default orderSlice.reducer