/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "orders",
    initialState: [],
    reducers: {
        loadProducts: (state, action) => {
            return [...action.payload];
        }
    }
});

export const { loadProducts } =
    productsSlice.actions;

export default productsSlice.reducer;
