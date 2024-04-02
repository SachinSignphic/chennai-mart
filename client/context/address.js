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
        },
        deleteAddress: (state, action) => {
            state.allAddresses = state.allAddresses.filter(addr => addr._id != action.payload);
        }
    },
});

export const { addAddress, populateAddresses, selectedAddress, deleteAddress } = addressSlice.actions;

export default addressSlice.reducer;
