import { View, Text, Image, FlatList, Pressable } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";


const ProductsSection = ({
    sectionTitle,
    sectionActionText,
    sectionActionURL,
    sectionCategory, // use this soon for filtering products via category
    randomize
}) => {
    const productDataState = useSelector((state) => state.products.products);
    const productData = useMemo(
        () =>
            randomize
                ? productDataState
                      .map((value) => ({
                          value,
                          sort: Math.random(),
                      }))
                      .sort((a, b) => a.sort - b.sort)
                      .map(({ value }) => value)
                : productDataState,
        [randomize]
    );

    return (
        <View className='flex flex-grow-0 w-full gap-4 px-2 mt-0.5 h-80'>
            <View className='flex px-2 flex-row justify-between items-center'>
                <Text className='text-xl modern:text-2xl font-nunito-800 text-primary'>
                    {sectionTitle}
                </Text>
                <Text className='text-sm modern:text-base font-nunito-400 text-primary'>
                    {sectionActionText}
                </Text>
            </View>
            <FlatList
                data={
                    productData
                }
                renderItem={({ item }) => (
                    <ProductCard
                        id={item.id}
                        title={item.title}
                        quantity={item.quantity}
                        price={item.price}
                        imageURL={item.image}
                        key={item.id}
                    />
                )}
                horizontal
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    gap: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    // height: 'auto'
                }}
                showsHorizontalScrollIndicator={false}
                className='flex-grow-0'
            />
        </View>
    );
};

export default ProductsSection;
