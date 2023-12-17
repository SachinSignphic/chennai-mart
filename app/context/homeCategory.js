import { createSlice } from "@reduxjs/toolkit";

export const homeCategorySlice = createSlice({
    name: "homeCategory",
    initialState: {
        category: "popular",
    },
    reducers: {
        selectCategory: (state, action) => {
            state.category = action.payload;
        },
    },
});

export const { selectCategory } = homeCategorySlice.actions;

export default homeCategorySlice.reducer;
