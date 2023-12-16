import { Stack } from "expo-router";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='[id]'
                options={{ headerShown: false }}
            />
        </Stack>
    );
};
