import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProAPI, { add, remove, upload } from '../../API/ProAPI'
export const getProduct = createAsyncThunk(
    'products/getProduct',
    async () => {
        const { data: products } = await ProAPI.getAll()
        return products
    }
)
export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (product) => {
        const { data } = await add(product)
        return data
    }
)
export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        await remove(id)
        const { data: products } = await ProAPI.getAll()
        return products
    }
)
export const uploadProduct = createAsyncThunk(
    'products/uploadProduct',
    async (product) => {
        const id=product[0]
        const productt=product[1]
        const { data } = await upload(id,productt)
        const { data: products } = await ProAPI.getAll()
        console.log(products)
        console.log(data)
    }
)
const productSlice = createSlice({
    name: 'products',
    initialState: {
        value: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.value.push(action.payload)
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(uploadProduct.fulfilled, (state, action) => {
            // state.value = action.payload
        })
    }
})
export default productSlice.reducer