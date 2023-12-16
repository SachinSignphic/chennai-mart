import { Stack } from "expo-router";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{ title: "Offers", headerShown: false }}
            />
        </Stack>
    );
};
