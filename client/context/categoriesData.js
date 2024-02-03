import { createSlice } from "@reduxjs/toolkit";

export const categoryDataSlice = createSlice({
    name: "categories",
    initialState: {
        categories: [
            {
                id: 1,
                category: "Fruits & Vegetables",
                image: require("@assets/image-2.png"),
            },
            {
                id: 2,
                category: "Atta, Rice, Oil & Dals",
                image: require("@assets/image-3.png"),
            },
            {
                id: 3,
                category: "Masala & Dry Fruits",
                image: require("@assets/image-4.png"),
            },
            {
                id: 4,
                category: "Sweet Cravings",
                image: require("@assets/image-5.png"),
            },
            {
                id: 5,
                category: "Frozen Food & Ice Creams",
                image: require("@assets/image-6.png"),
            },
            {
                id: 6,
                category: "Packaged Food",
                image: require("@assets/image-7.png"),
            },
            {
                id: 7,
                category: "Dairy, Bread & Eggs",
                image: require("@assets/image-8.png"),
            },
            {
                id: 8,
                category: "Cold Drinks & Juices",
                image: require("@assets/image-9.png"),
            },
            {
                id: 9,
                category: "Munchies & Chips",
                image: require("@assets/image-10.png"),
            },
            {
                id: 10,
                category: "Meats, Fish & Eggs",
                image: require("@assets/image-1.png"),
            },
        ],
    },
    reducers: {},
});

// export {  } = categoryDataSlice.actions;

export default categoryDataSlice.reducer;