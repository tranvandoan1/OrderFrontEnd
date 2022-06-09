import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProAPI, { add, remove, upload } from "../../API/ProAPI";
export const getProductAll = createAsyncThunk(
  "products/getProductAll",
  async () => {
    const { data: products } = await ProAPI.getAll();
    return products;
  }
);
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id) => {
    const products = await ProAPI.get(id);
    return products.data;
  }
);
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const { data } = await add(product);
    return data;
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (data) => {
    if (Array.isArray(data)) {
      // products.filter((item) => {
      //   data.map((d) => {
      //     if (d._id !== item._id) {
      //       // return item;
      //       console.log(item)
      //     }
      //   });
      // });
      // console.log("1");
      // console.log(products)
      // console.log(data)
      await data.map((item) => remove(item._id));
      const { data: products } = await ProAPI.getAll();
      return products;
    } else {
      console.log("2");
      await remove(data);
      const { data: products } = await ProAPI.getAll();
      return products;
    }
  }
);
export const uploadProduct = createAsyncThunk(
  "products/uploadProduct",
  async (product) => {
    const { data } = await upload(product._id, product);
    const { data: products } = await ProAPI.getAll();
    return products;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    value: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductAll.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      // state.value.push(action.payload)
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.value = action.payload;
    });
    builder.addCase(uploadProduct.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});
export default productSlice.reducer;
