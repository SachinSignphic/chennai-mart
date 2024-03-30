import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
    name: "address",
    initialState: {
        selected: '',
        allAddresses: []
    },
    reducers: {
        addAddress: (state, action) => {
            state.allAddresses.push(action.payload);
        },
        populateAddresses: (state, action) => {
            state.allAddresses = action.payload;
        },
        selectedAddress: (state, action) => {
            state.selected = action.payload;
        }
    },
});

export const { addAddress, populateAddresses, selectedAddress } = addressSlice.actions;

export default addressSlice.reducer;
