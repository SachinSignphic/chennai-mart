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
                name='mockpay/index'
                options={{
                    title: "Payment",
                    header: () => (
                        <StackHeader
                            // routeAction='/home'
                            headerTitle={"Payment"}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name='success/index'
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
};
