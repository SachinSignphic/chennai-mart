import { Stack } from "expo-router/stack";

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
