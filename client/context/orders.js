import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: []
    },
    reducers: {
        loadOrders: (state, action) => {
            state.orders = action.payload;
        },
        pushOrder: (state, action) => {
            state.push(action.payload);
        }
    },
});

export const { loadOrders, pushOrder } = orderSlice.actions;

export default orderSlice.reducer;
