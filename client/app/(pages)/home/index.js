// import { View, Text, Pressable, StatusBar } from "react-native";
import React, { useEffect } from "react";
// import { router } from "expo-router";
import {
    SafeArea,
    HomeHeader,
    HomeSearch,
    CategoryList,
    DealsBanner,
    ProductsSectionSanity,
} from "@/components";
// import { StatusBar } from "expo-status-bar";
import { BackHandler, StatusBar, View } from "react-native";
import { useNavigation } from "expo-router";

const home = () => {
    const navigation = useNavigation();
    
    useEffect(() => {
        const handleBack = (e) => {
            e.preventDefault();
            BackHandler.exitApp();
        };

        navigation.addListener("beforeRemove", handleBack);

        return () => {
            navigation.removeListener("beforeRemove", handleBack);
        };
    }, []);

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
            <View className='mb-6'></View>
            <StatusBar style="light" barStyle="dark-content" />
        </SafeArea>
    );
};

export default home;
