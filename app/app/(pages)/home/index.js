import { View, Text, Pressable, StatusBar, FlatList } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeArea, HomeHeader, HomeSearch, CategoryList } from "@components";

const home = () => {
    // console.log(searchKey)
    return (
        <SafeArea>
            <HomeHeader />
            <HomeSearch />
            <CategoryList />
            {/* test for product page stack */}
            <Pressable
                className='mt-6'
                onPress={() => router.push("home/product/1")}>
                <Text className='text-2xl'>Sample product page</Text>
            </Pressable>
        </SafeArea>
    );
};

export default home;
