import { Stack } from "expo-router/stack";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{ title: "Home" }}
            />
            <Stack.Screen
                name='product'
                options={{ title: "Products" }} // later make this a dynamic name with reference to expo docs
            />
        </Stack>
    );
};
