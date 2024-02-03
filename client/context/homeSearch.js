import { createSlice } from "@reduxjs/toolkit";

export const homeSearchSlice = createSlice({
    name: "homeSearch",
    initialState: {
        searchKey: "",
    },
    reducers: {
        inputText: (state, action) => {
            state.searchKey = action.payload;
        },
    },
});

export const { inputText } = homeSearchSlice.actions;

export default homeSearchSlice.reducer;