import { View, Text, Pressable, StatusBar, TextInput } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeArea } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { inputText } from "@context/homeSearch";
import { Ionicons } from "@expo/vector-icons";

const home = () => {
    const searchKey = useSelector((state) => state.homeSearch.searchKey);
    const dispatch = useDispatch();
    // console.log(searchKey)
    return (
        <SafeArea>
            <View className='header flex flex-row justify-around w-full '>
                <View>
                    <Text className='text-slate-700 text-2xl w-min'>
                        Welcome Back
                    </Text>
                    <Text className='text-slate-700 text-xl w-fit'>DAVID</Text>
                </View>
                <View className='flex flex-row items-center gap-6'>
                    <Ionicons
                        name='md-settings-sharp'
                        size={24}
                        color='black'
                    />
                    <View className="border w-24 h-24 rounded-full bg-secondary"></View>
                </View>
            </View>

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
