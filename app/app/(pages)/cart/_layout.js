import { Stack } from "expo-router";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{ title: "Cart", headerShown: false }}
            />
        </Stack>
    );
};
