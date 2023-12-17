import { FlatList, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "@context/homeCategory";

const CATEGORIES_BUTTONS = [
    {
        id: 1,
        title: "Popular",
        name: "popular",
        // image: '' // later add this
    },
    {
        id: 2,
        title: "Fruits",
        name: "fruits",
        // image: '' // later add this
    },
    {
        id: 3,
        title: "Veggies",
        name: "veggies",
        // image: '' // later add this
    },
    {
        id: 4,
        title: "Spices",
        name: "spices",
        // image: '' // later add this
    },
];

const CategoryButton = ({ title, name }) => {
    const category = useSelector((state) => state.homeCategory.category);
    const dispatch = useDispatch();
    // console.log(category)
    return (
        <Pressable
            className={`${
                category == name ? "bg-primary" : "bg-teal"
            } w-[120] space-x-2 px-5 py-3 rounded-2xl flex justify-center items-center`}
            style={{
                shadowOffset: {
                    width: 20,
                    height: 20,
                },
                shadowColor: "black",
                shadowOpacity: 10,
                shadowRadius: 10,
            }}
            onPress={() => dispatch(selectCategory(name))}>
            <Text
                className={`${
                    category == name ? "text-white" : "text-primary"
                } text-xl font-bold`}>
                {title}
            </Text>
        </Pressable>
    );
};

const CategoryList = () => {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            className='border pt-5'
            contentContainerStyle={{ height: "8%" }}>
            <FlatList
                data={CATEGORIES_BUTTONS}
                // className='border'
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    // height: "7.5%",
                    // marginTop: 20,
                    paddingHorizontal: 20,
                }}
                renderItem={({ item }) => (
                    <CategoryButton
                        title={item.title}
                        name={item.name}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    );
};

export default CategoryList;
