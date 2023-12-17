import { View, Text, FlatList, ImageBackground } from "react-native";
import React from "react";

const DEALS_BANNER_DATA = [
    {
        id: 1,
        image: require("../assets/banner-test.png"),
    },
    {
        id: 2,
        image: require("../assets/banner-test.png"),
    },
    {
        id: 3,
        image: require("../assets/banner-test.png"),
    },
];

const BannerCard = ({ id, imageURL }) => {
    return (
        <View className='w-[90vw] h-56 bg-teal rounded-xl relative shadow-lg shadow-black/40'>
            <ImageBackground
                resizeMode='cover'
                source={imageURL}
                className='flex-1 w-full h-full object-fill'
            />
            <Text className='absolute bottom-3 text-primary text-xl right-4'>
                {id + " " + imageURL}
            </Text>
        </View>
    );
};

const DealsBanner = () => {
    return (
        <FlatList
            data={DEALS_BANNER_DATA}
            className='flex-grow-0 mt-2'
            renderItem={({ item }) => (
                <BannerCard
                    id={item.id}
                    imageURL={item.image}
                />
            )}
            contentContainerStyle={{
                gap: 20,
                paddingHorizontal: 15,
                paddingVertical: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
        />
    );
};

export default DealsBanner;
