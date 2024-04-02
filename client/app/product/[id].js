import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    AntDesign,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import { TabBarCartAction } from "@components";
import { useSelector } from "react-redux";

const index = () => {
    const { id } = useGlobalSearchParams(); // use this to read from the state and fetch
    // data about the product
    const productData = useSelector(state => state.products.products);
    const currentProduct = productData.find(item => item._id == id);
    
    // console.log(currentProduct)
    // console.log(currentProduct?.description)

    return (
        // initial idea is a scrollview
        // but i really wanna implement a parallax thing where image shrinks
        // and the details pane slides above the image
        // also there should be a carousel for the image

        // fetch data for specific product and store it in the global store
        // actually initialy load some products, like in featured or blah blah,
        // then when clicking on product page, check if the specific product's ID
        // has actually been loaded before and then show the content accordingly
        // or just fetch it from the sanity server and store it in global store
        <>
            <ScrollView className='pb-4'>
                {/* view for image */}
                <View className='bg-teal flex items-center justify-center h-[35vh] pb-6'>
                    <Image
                        resizeMode='contain'
                        className='w-full h-full'
                        source={{ uri: currentProduct?.main_image.asset.url }}
                    />
                </View>

                {/* view for the details pane */}
                <View className='bg-white py-8 px-8 rounded-[32px]'>
                    <View className='flex flex-row flex-wrap justify-between py-4 border-b border-[#F0F3FB]'>
                        <Text className='text-xl modern:text-2xl font-nunito-800 text-primary'>
                            {currentProduct?.name}
                        </Text>
                        <Text className='text-xl font-nunito-400 text-primary'>
                            ₹
                            {currentProduct?.discounted_price === 0
                                ? (
                                      currentProduct?.price *
                                      (1 - currentProduct?.discount / 100)
                                  ).toFixed(2)
                                : currentProduct?.discounted_price}
                        </Text>
                    </View>
                    <View className='flex flex-row justify-around py-4 border-b border-[#F0F3FB]'>
                        <View className='flex items-center flex-row gap-2'>
                            <MaterialCommunityIcons
                                name='scale'
                                size={24}
                                color='black'
                            />
                            <Text className='text-primary font-nunito-400 text-base'>
                                {(currentProduct?.quantity_no ?? "500") +
                                    " " +
                                    (currentProduct?.quantity_count ?? "gm")}
                            </Text>
                        </View>
                        <View className='flex items-center flex-row gap-2'>
                            <AntDesign
                                name='staro'
                                size={24}
                                color='black'
                            />
                            <Text className='text-primary font-nunito-400 text-base'>
                                No ratings yet!
                            </Text>
                        </View>
                        <View className='flex items-center flex-row gap-2'>
                            <Ionicons
                                name='md-chatbubbles-outline'
                                size={24}
                                color='black'
                            />
                            <Text className='text-primary font-nunito-400 text-base'>
                                No reviews yet!
                            </Text>
                        </View>
                    </View>
                    {/* the mb-10 is temporary and should be appended to the last element in the page and not to this description */}
                    <View className='flex gap-2 py-6 mb-10'>
                        <Text className='text-xl text-primary font-nunito-800'>
                            Description
                        </Text>
                        <Text className='text-base text-secondary font-nunito-400'>
                            {currentProduct?.description
                                .map((desc) => desc.children[0]?.text)
                                .join("\n\n")}
                        </Text>
                    </View>
                </View>
                <StatusBar backgroundColor='rgb(242 245 253)' />
                <View className='mb-8'></View>
            </ScrollView>
            <TabBarCartAction id={id} />
        </>
    );
};

export default index;
