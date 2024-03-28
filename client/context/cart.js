import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        cartId: ''
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
        },
        addCartId: (state, action) => {
            state.cartId = action.payload
        },
        addToCartFromLS: (state, action) => {
            state.items = action.payload;
        }
    }
});

export const { addToCart, deleteCart, removeFromCart, addCartId, addToCartFromLS } = cartSlice.actions;

export default cartSlice.reducer;