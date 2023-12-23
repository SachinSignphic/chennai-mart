import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@context/cart";
import { AntDesign } from "@expo/vector-icons";

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
    {
        id: 4,
        title: "Bell Pepper Blue",
        quantity: "100mg",
        price: 200,
        image: require("../assets/icon.png"),
    },
    {
        id: 5,
        title: "Boll Paper Red Red ball bat",
        quantity: "100mg",
        price: 150,
        image: require("../assets/icon.png"),
    },
];

const ProductCard = ({ id, imageURL, title, quantity, price }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const currentCartItem = cartItems.find((item) => item.id == id);
    console.log(currentCartItem ?? id + ' Not yet added');

    return (
        <View className='p-4 w-[172px] bg-teal rounded-3xl flex flex-grow-0 justify-between'>
            <View className='product-card-action-container flex justify-center items-end w-full'>
                {currentCartItem && (
                    <View className='rounded-xl bg-primary flex justify-center flex-row items-center gap-x-2 gap-y-0.5'>
                        <TouchableOpacity
                            onPress={() => dispatch(removeFromCart({ id }))}
                            className=' w-9 h-9 flex justify-center items-center'>
                            <AntDesign
                                name='minus'
                                size={18}
                                color='white'
                            />
                        </TouchableOpacity>
                        <Text className='text-white font-nunito-400 text-base'>
                            {currentCartItem.quantity}
                        </Text>
                        <TouchableOpacity
                            onPress={() => dispatch(addToCart({ id }))}
                            className='w-9 h-9 flex justify-center items-center'>
                            <AntDesign
                                name='plus'
                                size={18}
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                )}
                {!currentCartItem && (
                    <TouchableOpacity
                        onPress={() => dispatch(addToCart({ id }))}
                        className='rounded-xl w-9 h-9 bg-primary flex justify-center items-center'>
                        <AntDesign
                            name='plus'
                            size={17}
                            color='white'
                        />
                    </TouchableOpacity>
                )}
            </View>
            <View className='w-full h-1/2 p-1 flex flex-grow-0'>
                <Image
                    resizeMode='contain'
                    className='w-full h-full'
                    source={imageURL}
                />
            </View>
            <View className='flex gap-4'>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    className='text-primary w-40 text-xl font-nunito-800'>
                    {title}
                </Text>
                <View className='flex flex-row justify-between items-center'>
                    <Text className='badge text-md px-4 py-1 bg-badge font-nunito-400 rounded-lg text-white'>
                        {quantity}
                    </Text>
                    <Text className='price text-base font-nunito-400'>
                        ₹{price}
                    </Text>
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
        <View className='flex flex-grow-0 w-full gap-4 px-2 mt-0.5 h-80'>
            <View className='flex px-2 flex-row justify-between items-center'>
                <Text className='text-2xl font-nunito-800 text-primary'>
                    {sectionTitle}
                </Text>
                <Text className='text-base font-nunito-400 text-primary'>
                    {sectionActionText}
                </Text>
            </View>
            <FlatList
                data={DUMMY_PRODUCT_DATA}
                renderItem={({ item }) => (
                    <ProductCard
                        id={item.id}
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
