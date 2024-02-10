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
    ProductsSectionSanity,
} from "@/components";
// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "react-native";

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
            <ProductsSectionSanity sectionCategory={"someId"} sectionTitle='Exclusive Offers' sectionActionText='See all' />
            <ProductsSectionSanity sectionCategory={"someId2"} sectionTitle='Deals for you' sectionActionText='See more' randomize />

            <StatusBar style="light" barStyle="dark-content" />
        </SafeArea>
    );
};

export default home;
