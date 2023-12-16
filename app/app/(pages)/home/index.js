import { View, Text, Pressable, StatusBar, TextInput } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeArea } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { inputText } from "@context/homeSearch";

const home = () => {
    const searchKey = useSelector((state) => state.homeSearch.searchKey);
    const dispatch = useDispatch();
    // console.log(searchKey)
    return (
        <SafeArea>
            <Text className='text-slate-700 text-2xl'>Home Screen</Text>
            <TextInput
                placeholder='enter'
                className='border-b text-xl w-[80%]'
                value={searchKey}
                onChangeText={(e) => dispatch(inputText(e))}
            />
            <Pressable onPress={() => router.push("home/product/1")}>
                <Text>Sample product page</Text>
            </Pressable>
        </SafeArea>
    );
};

export default home;
