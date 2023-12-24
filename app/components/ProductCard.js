import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import ProductCartAction from './ProductCartAction';
import { router } from 'expo-router';

const ProductCard = ({ id, imageURL, title, quantity, price, width }) => {
    return (
        <View
            className={`p-4 ${
                width
                    ? `max-w-[46%] max-h-60 mb-2 mx-1`
                    : "min-w-[172px] max-w-[192px]"
            } bg-teal rounded-3xl flex flex-grow-0 justify-between`}>
            <ProductCartAction productId={id} />
            <Pressable
                className='flex justify-between'
                onPress={() => router.push(`/home/product/${id}`)}>
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
                        className={`text-primary ${
                            width ? "w-[80%]" : "w-40"
                        }  text-xl font-nunito-800`}>
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
            </Pressable>
        </View>
    );
};

export default ProductCard