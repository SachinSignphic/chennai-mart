import { StackHeader } from "@components";
import { Stack } from "expo-router";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: "Cart",
                    header: () => (
                        <StackHeader
                            // routeAction='/home'
                            headerTitle={"Cart"}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name='modal'
                options={{
                    presentation: "card",
                    title: "Choose Address",
                }}
            />
        </Stack>
    );
};
