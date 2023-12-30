import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// this array is shared with _layout.js of settings page so if updated here, update there or else stackheader names break
const SETTINGS_MENU_TEXT = [
    {
        name: "Orders",
        icon: () => (
            <MaterialCommunityIcons
                name='shopping-outline'
                size={24}
                color='black'
            />
        ),
        to: "orders",
    },
    {
        name: "Manage Referrals",
        icon: () => (
            <Ionicons
                name='ios-heart-outline'
                size={24}
                color='black'
            />
        ),
        to: "referrals",
    },
    {
        name: "Customer Support & FAQ",
        icon: () => (
            <MaterialCommunityIcons
                name='message-reply-text-outline'
                size={24}
                color='black'
            />
        ),
        to: "faq",
    },
    {
        name: "Addresses",
        icon: () => (
            <MaterialIcons
                name='location-on'
                size={24}
                color='black'
            />
        ),
        to: "addresses",
    },
    {
        name: "Refunds",
        icon: () => (
            <MaterialCommunityIcons
                name='arrow-top-left-thin-circle-outline'
                size={24}
                color='black'
            />
        ),
        to: "refunds",
    },
    {
        name: "Profile",
        icon: () => (
            <FontAwesome5
                name='user'
                size={24}
                color='black'
            />
        ),
        isProfile: true,
        to: "user/1", // obtain user id from global store and then put it here
    },
    {
        name: "Suggest Products",
        icon: () => (
            <Feather
                name='package'
                size={24}
                color='black'
            />
        ),
        to: "suggest-products",
    },
    {
        name: "Policies",
        icon: () => (
            <Ionicons
                name='document-text-outline'
                size={24}
                color='black'
            />
        ),
        to: "policies",
    },
    {
        name: "Notifications",
        icon: () => (
            <Feather
                name='bell'
                size={24}
                color='black'
            />
        ),
        to: "notifications",
    },
];

const SettingsItem = ({ name, to, isProfile, icon: Icon }) => {
    return (
        <TouchableOpacity
            className='flex flex-row items-center py-4 border-b border-[#EBEBEB] space-y-4'
            onPress={() =>
                isProfile
                    ? router.push("/home/" + to)
                    : router.push("/home/settings/" + to)
            }>
            {Icon && (
                <View className='mt-3'>
                    <Icon className='border' />
                </View>
            )}
            <Text className='text-primary font-nunito-400 ml-6 text-lg'>
                {name}
            </Text>
        </TouchableOpacity>
    );
};

const index = () => {
    return (
        // <SafeAreaView>
            <ScrollView className='px-12 bg-white'>
                {SETTINGS_MENU_TEXT.map((settingsMenuContext, i) => (
                    <SettingsItem
                        key={i}
                        name={settingsMenuContext.name}
                        to={settingsMenuContext.to}
                        icon={settingsMenuContext.icon}
                        isProfile={settingsMenuContext.isProfile}
                    />
                ))}
            </ScrollView>
    );
};

export default index;
