import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { useGlobalSearchParams } from "expo-router";

const index = () => {
    const { id } = useGlobalSearchParams(); // use this to read from the state and fetch
    // data about the product

    return (
        // initial idea is a scrollview
        // but i really wanna implement a parallax thing where image shrinks
        // and the details pane slides above the image
        // also there should be a carousel for the image
        <ScrollView>
            {/* view for image */}
            <View className='border-b flex items-center justify-center'>
                <Image
                    resizeMode='center'
                    source={require("@assets/product1.png")}
                />
            </View>

            {/* view for the details pane */}
            <View>
                <Text>Bell Paper Red</Text>
            </View>
        </ScrollView>
    );
};

export default index;
