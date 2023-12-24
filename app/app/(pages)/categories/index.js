import { View, Text, TextInput, ScrollView, Image, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
// import { SafeArea } from "@components";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
// const DUMMY_CATEGORY_DATA = [
//     {
//         id: 1,
//         category: "Fruits & Vegetables",
//         image: require("@assets/image-2.png"),
//     },
//     {
//         id: 2,
//         category: "Atta, Rice, Oil & Dals",
//         image: require("@assets/image-3.png"),
//     },
//     {
//         id: 3,
//         category: "Masala & Dry Fruits",
//         image: require("@assets/image-4.png"),
//     },
//     {
//         id: 4,
//         category: "Sweet Cravings",
//         image: require("@assets/image-5.png"),
//     },
//     {
//         id: 5,
//         category: "Frozen Food & Ice Creams",
//         image: require("@assets/image-6.png"),
//     },
//     { id: 6, category: "Packaged Food", image: require("@assets/image-7.png") },
//     {
//         id: 7,
//         category: "Dairy, Bread & Eggs",
//         image: require("@assets/image-8.png"),
//     },
//     {
//         id: 8,
//         category: "Cold Drinks & Juices",
//         image: require("@assets/image-9.png"),
//     },
//     {
//         id: 9,
//         category: "Munchies & Chips",
//         image: require("@assets/image-10.png"),
//     },
//     {
//         id: 10,
//         category: "Meats, Fish & Eggs",
//         image: require("@assets/image-1.png"),
//     },
// ];

const CategoryCard = ({ id, category, image }) => {
    return (
        <Pressable hitSlop={5} onPress={() => router.push(`/categories/${id}`)}>
            <View className='flex justify-start items-center gap-0 w-20'>
                <Image
                    className='w-full'
                    source={image}
                    resizeMode='contain'
                />
                <Text className='font-nunito-400 text-md text-primary'>
                    {category}
                </Text>
            </View>
        </Pressable>
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
                    gap: 6,
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
                        // value={searchKey}
                        // onChangeText={(e) => dispatch(inputText(e))}
                    />
                </View>


                {/*  two top category dabbas */}
                <Pressable  hitSlop={5} onPress={() => router.push(`/categories/${1}`)} className='flex justify-start items-center w-[45vw]'>
                    <Image
                        className='w-full'
                        source={categoriesData[0].image}
                        resizeMode='contain'
                    />
                    <Text className='font-nunito-400 text-md text-primary'>
                        {categoriesData[0].category}
                    </Text>
                </Pressable>
                <Pressable  hitSlop={5} onPress={() => router.push(`/categories/${2}`)} className='flex justify-start items-center w-[45vw]'>
                    <Image
                        className='w-full'
                        source={categoriesData[1].image}
                        resizeMode='contain'
                    />
                    <Text className='font-nunito-400 text-md text-primary'>
                        {categoriesData[1].category}
                    </Text>
                </Pressable>

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
