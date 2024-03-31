/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "orders",
    initialState: [
        
    ],
    reducers: {
        loadOrders: (state, action) => {
            return [...action.payload];
        },
        modifyOrder: (state, action) => {
            const orderDataToModify = state.findIndex(
                (order) => order._id == action.payload._id
            );
            if (orderDataToModify != -1) {
                state[orderDataToModify] = action.payload;
            }
        },
        deleteOrder: (state, action) => {
            const orderIndexToDelete = state.findIndex(
                (order) => order._id == action.payload._id
            );
            if (orderIndexToDelete != -1) {
                state.splice(orderIndexToDelete, 1);
            }
        },
        clearOrders: (state) => {
            state = [];
        },
    },
});

export const {
    clearOrders,
    deleteOrder,
    loadOrders,
    modifyOrder
} = orderSlice.actions;

export default orderSlice.reducer;
