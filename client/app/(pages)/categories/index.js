import { View, Text, TextInput, ScrollView, Image, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
// import { SafeArea } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// deleted a big ass dummy data comment

const CategoryCard = ({ id, category, image }) => {
    return (
        <TouchableOpacity
            className='flex justify-start items-center gap-0 w-20'
            onPress={() => router.push(`/categories/${id}`)}>
            <Image
                className='w-full'
                source={image}
                resizeMode='contain'
            />
            <Text className='font-nunito-400 text-md leading-4 text-primary'>
                {category}
            </Text>
        </TouchableOpacity>
    );
};

const index = () => {
    const categoriesData = useSelector((state) => state.categories.categories);
    
    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 10,
                }}
                className='px-2 py-4 bg-white w-full'>


                <View className='flex flex-row mb-4 justify-center gap-x-4 items-center w-[90%]'>
                    <Ionicons
                        name='md-search-outline'
                        size={24}
                        className='text-primary'
                    />
                    <TextInput
                        placeholder='What are you looking for?'
                        className='border-b border-b-slate-300 py-2 font-nunito-400 text-base w-[90%]'
                        // value={searchKey} state to search coming soon
                        // onChangeText={(e) => dispatch(inputText(e))}
                    />
                </View>


                {/*  two top category dabbas */}
                <TouchableOpacity  hitSlop={5} onPress={() => router.push(`/categories/${1}`)} className='flex justify-start items-center w-[45vw]'>
                    <Image
                        className='w-full'
                        source={categoriesData[0].image}
                        resizeMode='contain'
                    />
                    <Text className='font-nunito-400 text-md text-primary'>
                        {categoriesData[0].category}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  hitSlop={5} onPress={() => router.push(`/categories/${2}`)} className='flex justify-start items-center w-[45vw]'>
                    <Image
                        className='w-full'
                        source={categoriesData[1].image}
                        resizeMode='contain'
                    />
                    <Text className='font-nunito-400 text-md text-primary'>
                        {categoriesData[1].category}
                    </Text>
                </TouchableOpacity>

                {categoriesData.slice(2).map((categoryData, i) => {
                    return (
                        <CategoryCard
                            key={i}
                            id={categoryData.id}
                            category={categoryData.category}
                            image={categoryData.image}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default index;
