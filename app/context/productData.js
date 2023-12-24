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
                mainImage: require("@assets/product1.png"),
                description: `Fugiat incididunt nisi ipsum magna non sunt labore sunt labore. Mollit anim non tempor nisi nisi anim sunt occaecat. Pariatur non eu officia nisi mollit irure et adipisicing cillum et. Cupidatat duis id laboris quis est ex id irure. Cillum consectetur ullamco anim irure fugiat excepteur incididunt ea esse id tempor.`,
            },
            {
                id: "2",
                title: "Organic Ginger",
                quantity: "100mg",
                price: 100,
                image: require("../assets/test-product2.png"),
                mainImage: require("@assets/product2.png"),
                description: `Do commodo minim culpa aliqua non minim do sint non. Cupidatat ipsum cupidatat ut laboris reprehenderit tempor occaecat. Ut voluptate reprehenderit velit sit laborum pariatur et duis. Consectetur magna elit elit do ea ullamco amet laborum. Officia et sit enim do sint velit amet dolore.`,
            },
            {
                id: "3",
                title: "Bell Pepper Red",
                quantity: "100mg",
                price: 100,
                image: require("../assets/icon.png"),
                mainImage: require("@assets/product1.png"),
                description: `Mollit sit occaecat pariatur consectetur velit in cupidatat amet deserunt. Amet nulla est pariatur eu eiusmod adipisicing tempor. Ea culpa pariatur incididunt sint tempor. Anim cupidatat amet tempor eiusmod voluptate culpa. Magna laboris voluptate magna fugiat sint id amet. Minim sint mollit quis consequat Lorem eiusmod veniam enim laboris ea ullamco minim cupidatat. Proident est sit anim incididunt in proident incididunt fugiat proident excepteur.`,
            },
            {
                id: "4",
                title: "Bell Pepper Blue",
                quantity: "100mg",
                price: 200,
                image: require("../assets/icon.png"),
                mainImage: require("@assets/product2.png"),
                description: `Est aliquip Lorem reprehenderit pariatur laborum. Sit voluptate incididunt irure non laborum ullamco laboris. Laboris consequat aliqua ad cupidatat. Tempor tempor tempor veniam anim mollit mollit officia esse. Eu commodo reprehenderit deserunt voluptate exercitation in irure eu aliquip aliqua nisi amet. Ea culpa magna reprehenderit ut officia ex.`,
            },
            {
                id: "5",
                title: "Boll Paper Red Red ball bat",
                quantity: "100mg",
                price: 150,
                image: require("../assets/icon.png"),
                mainImage: require("@assets/product1.png"),
                description: `Amet duis laborum et aliqua duis. Dolore officia voluptate ullamco in et ut nisi ex incididunt reprehenderit. Exercitation aliqua eu do reprehenderit. Exercitation sit qui quis pariatur non sint.`,
            },
            {
                id: "6",
                title: "Onion",
                quantity: "1kg",
                price: 50,
                image: require("@assets/product-6.png"),
                mainImage: require("@assets/product-6.png"),
                description: `Amet duis laborum et aliqua duis. Dolore officia voluptate ullamco in et ut nisi ex incididunt reprehenderit. Exercitation aliqua eu do reprehenderit. Exercitation sit qui quis pariatur non sint.`,
            },
            {
                id: "7",
                title: "Tomato",
                quantity: "1kg",
                price: 40,
                image: require("@assets/product-3.png"),
                mainImage: require("@assets/product-3.png"),
                description: `Amet duis laborum et aliqua duis. Dolore officia voluptate ullamco in et ut nisi ex incididunt reprehenderit. Exercitation aliqua eu do reprehenderit. Exercitation sit qui quis pariatur non sint.`,
            },
            {
                id: "8",
                title: "Carrot",
                quantity: "0.5kg",
                price: 60,
                image: require("@assets/product-5.png"),
                mainImage: require("@assets/product-5.png"),
                description: `Amet duis laborum et aliqua duis. Dolore officia voluptate ullamco in et ut nisi ex incididunt reprehenderit. Exercitation aliqua eu do reprehenderit. Exercitation sit qui quis pariatur non sint.`,
            },
            {
                id: "9",
                title: "Cucumber",
                quantity: "1kg",
                price: 160,
                image: require("@assets/product-4.png"),
                mainImage: require("@assets/product-4.png"),
                description: `Amet duis laborum et aliqua duis. Dolore officia voluptate ullamco in et ut nisi ex incididunt reprehenderit. Exercitation aliqua eu do reprehenderit. Exercitation sit qui quis pariatur non sint.`,
            },
        ],
    },
    reducers: {},
});

// export const { action } = productDataSlice.actions;

export default productDataSlice.reducer;
