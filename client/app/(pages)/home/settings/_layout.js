import { StackHeader } from "@components";
import { Stack } from "expo-router";


// following array copied from index.js
// IMPORTANT: removed profile object because profile is simply mapped to /home/user/1
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
    // {
    //     name: "Profile",
    //     icon: () => (
    //         <FontAwesome5
    //             name='user'
    //             size={24}
    //             color='black'
    //         />
    //     ),
    //     to: "profile",
    // },
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

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    header: () => (
                        <StackHeader
                            routeAction='/home'
                            headerTitle='Settings'
                        />
                    ),
                    headerBackVisible: false,
                }}
            />
            {SETTINGS_MENU_TEXT.map((setting, i) => {
                return (
                    <Stack.Screen
                    key={i}
                        name={setting.to}
                        options={{
                            header: () => (
                                <StackHeader
                                    routeAction='../'
                                    headerTitle={setting.name}
                                />
                            ),
                            headerBackVisible: false,
                        }}
                    />
                );
            })}
        </Stack>
    );
};
