import { StackHeader } from "@/components";
import { Stack } from "expo-router";

export default Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name='[id]'
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
        </Stack>
    );
};
