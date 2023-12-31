import { FlatList, Text, Pressable } from "react-native";
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
            // style={{
            //     shadowColor: "#171717",
            //     shadowOffset: { width: -2, height: 4 },
            //     shadowOpacity: 0.2,
            //     shadowRadius: 3,
            // }}
            className={`${
                category == name
                    ? "bg-primary shadow-lg shadow-black/80"
                    : "bg-teal"
            } space-x-2 modern:space-x-4 px-4 modern:px-6 py-1.5 modern:py-2 rounded-xl flex justify-center items-center`}
            onPress={() => dispatch(selectCategory(name))}>
            <Text
                className={`${
                    category == name ? "text-white" : "text-primary"
                } text-sm modern:text-xl`}
                style={{
                    fontFamily: 'Nunito'
                }}>
                {title}
            </Text>
        </Pressable>
    );
};

const CategoryList = () => {
    return (
        <FlatList
            data={CATEGORIES_BUTTONS}
            className='flex-grow-0 mt-2 modern:mt-3'
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap: 15,
                // height: "7.5%",
                // marginTop: 20,
                paddingHorizontal: 20,
                paddingVertical: 10
            }}
            renderItem={({ item }) => (
                <CategoryButton
                    title={item.title}
                    name={item.name}
                />
            )}
            keyExtractor={(item) => item.id}
        />
    );
};

export default CategoryList;
