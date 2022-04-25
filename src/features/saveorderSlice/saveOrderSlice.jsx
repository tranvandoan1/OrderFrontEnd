import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SaveorderAPI, { add, remove, upload } from "../../API/SaveOrder";
export const getSaveOrder = createAsyncThunk(
    "saveorder/getSaveOrder",
    async () => {
        const { data: saveorder } = await SaveorderAPI.getAll()
        return saveorder
    }
)
export const addSaveOrder = createAsyncThunk(
    'product/addSaveOrder',
    async (saveorder) => {
        const { data } = await add(saveorder);
        return data
    }
)
export const uploadSaveOrder = createAsyncThunk(
    "saveorder/uploadSaveOrder",
    async (saveorder) => {
        await upload(saveorder._id, saveorder);
        const { data: saveorders } = await SaveorderAPI.getAll()
        return saveorders

    }
)
export const deleteSaveOrder = createAsyncThunk(
    "saveorder/deleteSaveOrder",
    async (id) => {
        const { data } = await remove(id);
        return data

    }
)

export const deleteSaveOrders = createAsyncThunk(
    "saveorder/deleteSaveOrders",
    async (data) => {
        data.map(item => remove(item._id))
        const { data: saveorders } = await SaveorderAPI.getAll()
        return saveorders
    }
)
export const uploadSaveOrders = createAsyncThunk(
    "saveorder/uploadSaveOrders",
    async (data) => {
        console.log(data)
        data.saveorders.map(item => console.log(item._id,{ ...item, floor_id: data.selectId.floor_id, id_table: data.selectId.id_table }))
        // const { data: saveorders } = await SaveorderAPI.getAll()
        // console.log(saveorders) 
        // return saveorders

    }
)

const saveorderSlice = createSlice({
    name: 'saveorder',
    initialState: {
        value: []
    },
    reducers: {
        addSaveorder(state, action) {
            state.value.push(SaveorderAPI.addOder(action.payload))
        },
        removeSaveorder(state, action) {
            state.value = (action.payload)
        },
        // updateSaveorder(state, action) {
        //     state.value = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getSaveOrder.fulfilled, (state, action) => {
            state.value = action.payload
        })
        builder.addCase(addSaveOrder.fulfilled, (state, action) => {
            state.value.push(action.payload)
        }),
            builder.addCase(uploadSaveOrder.fulfilled, (state, action) => {
                state.value = action.payload
            })
        builder.addCase(deleteSaveOrders.fulfilled, (state, action) => {
            state.value = action.payload
        })
    }
})
export const { updateSaveorder, addSaveorder, removeSaveorder } = saveorderSlice.actions
export default saveorderSlice.reducer