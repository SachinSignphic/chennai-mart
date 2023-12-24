import { Stack, useLocalSearchParams } from "expo-router";
// import { Image } from "react-native";
import { StackHeader } from "@components";

export default Layout = () => {
    const x = useLocalSearchParams();
    // console.log("product id from route is: ", x.id);
    /* probably move this global store to even further above the entry js */
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: "Home",
                    headerTintColor: "black",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='product'
                options={{
                    headerBackVisible: false,
                    header: ({ route, navigation, options, back }) => {
                        const isProductPage = route.params?.id;
                        console.log(route, back.title);
                        return (
                            <StackHeader
                                // routeAction='/home'
                                headerTitle=''
                                cartActionForId={isProductPage || null}
                            />
                        );
                    },
                }}
            />
            <Stack.Screen
                name='settings'
                options={{
                    header: () => (
                        <StackHeader
                            routeAction='/home'
                            headerTitle='Settings'
                        />
                    ),
                    headerBackVisible: false,
                    // headerTitleAlign: "center",
                    // headerLeft: ,
                }}
            />
            <Stack.Screen
                name='user'
                options={{
                    headerBackVisible: false,
                    header: () => (
                        <StackHeader
                            // routeAction='/home'
                            headerTitle='Profile'
                        />
                    ),
                }}
            />
        </Stack>
    );
};
