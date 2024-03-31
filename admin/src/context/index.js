import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./orderSlice";
import productsSlice from "./productsSlice";

export default configureStore({
    reducer: {
        orders: orderSlice,
        products: productsSlice
    }
})