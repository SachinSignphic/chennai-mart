import { Stack } from "expo-router/stack";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{ title: "Categories" }}
            />
        </Stack>
    );
};
