import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { DealsBanner, ProductsSection } from "@components";
import Swiper from "react-native-swiper";

const DUMMY_DEALS_DATA = [
    {
        image: require("@assets/deal-1.png"),
    },
    {
        image: require("@assets/deal-1.png"),
    },
    {
        image: require("@assets/deal-1.png"),
    },
];

const OffersPageBanner = ({ image }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} className='flex-1'>
            <Image
                source={image}
                className='w-full h-full'
                resizeMode='contain' />
        </TouchableOpacity>
    );
};

const index = () => {
    return (
        <ScrollView className='bg-white'>
            <View className='h-[24vh] flex-1'>
                <Swiper
                    paginationStyle={{ bottom: 4 }}
                    dot={
                        <View className='w-1 mr-1 h-1 bg-primary rounded-full'></View>
                    }
                    activeDot={
                        <View className='w-1.5 mr-1 h-1.5 bg-primary rounded-full'></View>
                    }
                    autoplay
                    autoplayTimeout={3}
                    >
                    {DUMMY_DEALS_DATA.map((deal, i) => (
                        <OffersPageBanner key={i} image={deal.image} />
                    ))}
                </Swiper>
            </View>
            <ProductsSection
                sectionCategory={"summa"}
                sectionTitle={"Today's offers"}
                sectionActionText={"See more"}
                randomize={true} // this is a testing feature to just mimic different categories 
            />
            <DealsBanner />
        </ScrollView>
    );
};

export default index;
