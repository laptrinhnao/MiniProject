import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategorySliceProps } from "@/type";

let category: CategorySliceProps = {
  categoryArr: [],
  status: false,
};
//
type initialStateType = {
  category: CategorySliceProps;
};
const initialState: initialStateType = {
  category,
};

export const categorySlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.category.status = false;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category.categoryArr = action.payload;
        state.category.status = true;
      });
  },
});

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const res = await fetch("http://localhost:8070/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

export const {} = categorySlice.actions;
export default categorySlice.reducer;
