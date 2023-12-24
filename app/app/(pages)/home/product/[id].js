import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    SimpleLineIcons,
    AntDesign,
    Ionicons,
} from "@expo/vector-icons";
import { TabBarCartAction } from "@components";
import { useSelector } from "react-redux";

const index = () => {
    const { id } = useGlobalSearchParams(); // use this to read from the state and fetch
    // data about the product
    const productData = useSelector(state => state.products.products);
    const currentProduct = productData.find(item => item.id == id);
    
    // console.log(currentProduct)

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
            <ScrollView>
                {/* view for image */}
                <View className='bg-teal flex items-center justify-center h-[50vh]'>
                    <Image
                        resizeMode='center'
                        source={currentProduct?.mainImage}
                    />
                </View>

                {/* view for the details pane */}
                <View className='bg-white py-8 px-8 rounded-[32px]'>
                    <View className='flex flex-row justify-between py-4 border-b border-[#F0F3FB]'>
                        <Text className='text-2xl font-nunito-800 text-primary'>
                            {currentProduct?.title}
                        </Text>
                        <Text className='text-xl font-nunito-400 text-primary'>
                            ₹{currentProduct?.price}
                        </Text>
                    </View>
                    <View className='flex flex-row justify-around py-4 border-b border-[#F0F3FB]'>
                        <View className='flex items-center flex-row gap-2'>
                            <SimpleLineIcons
                                name='fire'
                                size={24}
                                color='black'
                            />
                            <Text className='text-primary font-nunito-400 text-base'>
                                {currentProduct?.quantity}
                            </Text>
                        </View>
                        <View className='flex items-center flex-row gap-2'>
                            <AntDesign
                                name='staro'
                                size={24}
                                color='black'
                            />
                            <Text className='text-primary font-nunito-400 text-base'>
                                4.8
                            </Text>
                        </View>
                        <View className='flex items-center flex-row gap-2'>
                            <Ionicons
                                name='md-chatbubbles-outline'
                                size={24}
                                color='black'
                            />
                            <Text className='text-primary font-nunito-400 text-base'>
                                201 reviews
                            </Text>
                        </View>
                    </View>
                    <View className='flex gap-2 py-6'>
                        <Text className='text-xl text-primary font-nunito-800'>
                            Description
                        </Text>
                        <Text className='text-base text-secondary font-nunito-400'>
                            Fugiat incididunt nisi ipsum magna non sunt labore
                            sunt labore. Mollit anim non tempor nisi nisi anim
                            sunt occaecat. Pariatur non eu officia nisi mollit
                            irure et adipisicing cillum et. Cupidatat duis id
                            laboris quis est ex id irure. Cillum consectetur
                            ullamco anim irure fugiat excepteur incididunt ea
                            esse id tempor.
                        </Text>
                    </View>
                </View>
                <StatusBar backgroundColor='rgb(242 245 253)' />
            </ScrollView>
            <TabBarCartAction id={id} />
        </>
    );
};

export default index;
