// import { View, Text, Pressable, StatusBar } from "react-native";
import React from "react";
// import { router } from "expo-router";
import {
    SafeArea,
    HomeHeader,
    HomeSearch,
    CategoryList,
    DealsBanner,
    ProductsSection,
} from "@components";

const home = () => {
    // console.log(searchKey)
    return (
        <SafeArea>
            <HomeHeader />
            <HomeSearch />
            <CategoryList />
            <DealsBanner />

            {/* for this section actually obtain from sanity server based on category
                like query should filter out data with the category and then put
                all the products obtained in the global store.

                Once the products are stored, then render the component below with 
                a prop called category or some shit, that will filter out products from 
                global store and then render it
            */}
            <ProductsSection sectionCategory={"someId"} sectionTitle='Exclusive Offers' sectionActionText='See All' />

            {/* test for product page stack */}
            {/* <Pressable
                className='mb-6'
                onPress={() => router.push("home/product/1")}>
                <Text className='text-2xl'>Sample product page</Text>
            </Pressable> */}
        </SafeArea>
    );
};

export default home;
