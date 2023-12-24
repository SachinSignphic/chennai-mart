import { createSlice } from "@reduxjs/toolkit";


// has the global data store, but should actually fetch data from server
// GROQ query to fetch
// *[_type=='products'] | order(_createdAt) {
//     _id,
//     name,
//     tags,
//     main_image {
//       asset -> {
//         url
//       }
//     },
//     images[]{asset -> {url}}
// }

export const productDataSlice = createSlice({
    name: "productsData",
    initialState: {
        products: [
            {
                id: "1",
                title: "Bell Pepper Red",
                quantity: "100mg",
                price: 450,
                image: require("../assets/test-product1.png"),
                mainImage: require("@assets/product1.png")
            },
            {
                id: "2",
                title: "Organic Ginger",
                quantity: "100mg",
                price: 100,
                image: require("../assets/test-product2.png"),
                mainImage: require("@assets/product2.png")
            },
            {
                id: "3",
                title: "Bell Pepper Red",
                quantity: "100mg",
                price: 100,
                image: require("../assets/icon.png"),
                mainImage: require("@assets/product1.png")
            },
            {
                id: "4",
                title: "Bell Pepper Blue",
                quantity: "100mg",
                price: 200,
                image: require("../assets/icon.png"),
                mainImage: require("@assets/product2.png")
            },
            {
                id: "5",
                title: "Boll Paper Red Red ball bat",
                quantity: "100mg",
                price: 150,
                image: require("../assets/icon.png"),
                mainImage: require("@assets/product1.png")
            },
        ],
    },
    reducers: {}
});

// export const { action } = productDataSlice.actions;

export default productDataSlice.reducer;