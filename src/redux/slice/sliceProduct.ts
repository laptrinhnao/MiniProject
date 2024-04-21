import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductSliceProps } from "../../type";
import axios from "axios";

let product: ProductSliceProps = {
  productArr: [],
  status: false,
};
//
type initialStateType = {
  product: ProductSliceProps;
};
const initialState: initialStateType = {
  product,
};

export const productSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.product.status = false;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product.productArr = action.payload;
        state.product.status = true;
      });
  },
});

export const fetchProduct = createAsyncThunk("todo/fetchProduct", async () => {
  try {
    const res = await axios("/product?offset=5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const {} = productSlice.actions;
export default productSlice.reducer;
