import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";

const DUMMY_PRODUCT_DATA = [
    {
        id: 1,
        title: "Bell Pepper Red",
        quantity: "100mg",
        price: 450,
        image: require("../assets/test-product1.png"),
    },
    {
        id: 2,
        title: "Organic Ginger",
        quantity: "100mg",
        price: 100,
        image: require("../assets/test-product2.png"),
    },
    {
        id: 3,
        title: "Bell Pepper Red",
        quantity: "100mg",
        price: 100,
        image: require("../assets/icon.png"),
    },
];

const ProductCard = ({ imageURL, title, quantity, price }) => {
    return (
        <View className='w-[42vw] h-[32vh] p-4 bg-teal rounded-3xl flex justify-between'>
            <View className='product-card-action-container flex justify-center items-center h-[9vw] w-[9vw] bg-primary rounded-xl ml-auto'>
                <TouchableOpacity>
                    <Text className='text-white text-4xl'>+</Text>
                </TouchableOpacity>
            </View>
            <View className='w-full h-1/2 p-4'>
                <Image
                    resizeMode='contain'
                    className='w-full h-full'
                    source={imageURL}
                />
            </View>
            <View className='flex gap-4'>
                <Text className='text-primary text-2xl font-semibold'>
                    {title}
                </Text>
                <View className='flex flex-row justify-between items-center'>
                    <Text className='badge text-lg px-4 py-1 bg-badge rounded-lg text-white'>
                        {quantity}
                    </Text>
                    <Text className='price text-xl font-medium'>₹{price}</Text>
                </View>
            </View>
        </View>
    );
};

const ProductsSection = ({
    sectionTitle,
    sectionActionText,
    sectionActionURL,
}) => {
    // perform data fetching from the sanity and then render this shit
    return (
        <View className='flex w-full gap-4 px-2 mt-3'>
            <View className='flex px-2 flex-row justify-between items-center'>
                <Text className='text-3xl font-bold text-primary'>
                    {sectionTitle}
                </Text>
                <Text className='text-lg text-primary'>
                    {sectionActionText}
                </Text>
            </View>
            <FlatList
                data={DUMMY_PRODUCT_DATA}
                renderItem={({ item }) => (
                    <ProductCard
                        title={item.title}
                        quantity={item.quantity}
                        price={item.price}
                        imageURL={item.image}
                    />
                )}
                horizontal
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    gap: 20,
                    paddingHorizontal: 10,
                    paddingVertical: 10
                }}
                showsHorizontalScrollIndicator={false}
                // className='border'
            />
        </View>
    );
};

export default ProductsSection;
