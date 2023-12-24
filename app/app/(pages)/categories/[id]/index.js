import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { router, useGlobalSearchParams } from "expo-router";
import useCategoriesData from "../categoriesData";
import { useSelector } from "react-redux";
import { ProductCard } from "@components";

const CategoryMenu = ({ id, image, category, isActive }) => {
    return (
        <TouchableOpacity
            className={`p-2 flex ${
                isActive && "bg-teal shadow-lg shadow-black/40"
            }`}
            onPress={() => router.push(`/categories/${id}`)}>
            <Image
                resizeMode='contain'
                className='w-20 h-28'
                source={image}
            />
            <Text
                ellipsizeMode='tail'
                numberOfLines={1}
                className='w-20 text-base text-primary font-nunito-400'>
                {category}
            </Text>
        </TouchableOpacity>
    );
} 

const index = () => {
    const { id } = useGlobalSearchParams();
    const productsData = useSelector(state => state.products.products);
    const categories = useCategoriesData(); //fking dummy hook XD

    return (
        <View className='flex flex-1 flex-row bg-white'>
            <View className='flex shadow-lg shadow-black/40'>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        display: "flex",
                        flexGrow: 0,
                    }}
                    data={categories}
                    renderItem={({ item: category }) => (
                        <CategoryMenu
                            id={category.id}
                            category={category.category}
                            image={category.image}
                            isActive={id == category.id}
                        />
                    )}
                />
            </View>
            <View className='flex flex-1'>
                <FlatList
                    data={productsData}
                    className=''
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: product }) => (
                        <ProductCard
                            {...product}
                            imageURL={product.image}
                            width={100}
                        />
                    )}
                />
            </View>
        </View>
    );
};

export default index;
