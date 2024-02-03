import { Stack, useLocalSearchParams } from "expo-router";
// import { Image } from "react-native";
import { StackHeader } from "@components";

export default Layout = () => {
    const x = useLocalSearchParams();
    
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
                    header: ({ route }) => {
                        const isProductPage = route.params?.id;
                        return (
                            <StackHeader
                                
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
                    headerShown: false,
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
