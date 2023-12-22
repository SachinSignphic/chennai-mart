import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        // check for cart items via API
    },
    reducers: {
        addToCart: (state, action) => {
            let presentItemIndex = state.items.findIndex(item => item.id == action.payload.id);
            // console.log("presentItemIndex",presentItemIndex)
            if (presentItemIndex != -1) {
                // console.log(state.items[presentItemIndex]);
                state.items[presentItemIndex].quantity++;
                // also an API request to store cart data in DB
                return;
            } else {
                state.items.push({
                    id: action.payload.id,
                    quantity: 1
                });
            }
        },
        removeFromCart: (state, action) => {
            let presentItemIndex = state.items.findIndex(item => item.id == action.payload.id);
            if (presentItemIndex != -1) {
                state.items[presentItemIndex].quantity == 1
                    ? state.items.splice(presentItemIndex, 1)
                    : state.items[presentItemIndex].quantity--;
                // also an API request to store cart data in DB
                return;
            } 
        },
        deleteCart: (state, action) => {
            state.items = [];
        }
    }
});

export const { addToCart, deleteCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;