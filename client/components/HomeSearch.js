import { View, TextInput } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { inputText } from "@/context/homeSearch";
import { Ionicons } from "@expo/vector-icons";

const HomeSearch = () => {
    const searchKey = useSelector((state) => state.homeSearch.searchKey);
    const dispatch = useDispatch();

    return (
        <View className='flex flex-row justify-between gap-2 items-center'>
            <Ionicons
                name='md-search-outline'
                size={24}
                className='text-primary'
            />
            <TextInput
                placeholder='What are you looking for?'
                className='border-b border-b-slate-300 py-2 font-nunito-400 text-base w-[80%]'
                value={searchKey}
                onChangeText={(e) => dispatch(inputText(e))}
            />
        </View>
    );
};

export default HomeSearch;
