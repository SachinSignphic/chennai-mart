import { View, Text, ScrollView } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
const SETTINGS_MENU_TEXT = [
    {
        name: "Orders",
        icon: () => (
            <MaterialCommunityIcons
                name='shopping-outline'
                size={24}
                color='black'
                className='flex self-center absolute'
            />
        ),
        to: "",
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
        to: "",
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
        to: "",
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
        to: "",
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
        to: "",
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
        to: "",
    },
    {
        name: "Suggest Products",
        icon: "",
        to: "",
    },
    {
        name: "Policies",
        icon: "",
        to: "",
    },
    {
        name: "Notifications",
        icon: "",
        to: "",
    },
];

const SettingsItem = ({ name, to, icon: Icon }) => {
    return (
        <View className='flex flex-row items-center py-4 border-b border-[#EBEBEB] space-y-4'>
            {Icon && <Icon />}
            <Text className='text-primary font-nunito-400 ml-6 text-lg'>{name}</Text>
        </View>
    );
};

const index = () => {
    return (
      
        <ScrollView className='px-12'>
            {SETTINGS_MENU_TEXT.map((settingsMenuContext, i) => (
                <SettingsItem
                    key={i}
                    name={settingsMenuContext.name}
                    to={settingsMenuContext.to}
                    icon={settingsMenuContext.icon}
                />
            ))}
        </ScrollView>
    );
};

export default index;
