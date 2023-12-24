import { StackHeader } from "@components";
import { Stack } from "expo-router";
import useCategoriesData from "./categoriesData";

export default Layout = () => {
    const categories = useCategoriesData();

    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: "",
                    // headerShown: false,
                    header: () => <StackHeader routeAction='/home' headerTitle={"Categories"} />,
                }}
            />
            <Stack.Screen
                name='[id]'
                options={{
                    title: '',
                    // headerShown: false,
                    header: ({ route }) => {
                        const categoryId = route.params?.id;
                        // console.log("e",categoryId)
                        const categoryName = categories.find(category => category.id == categoryId).category;
                        // console.log(categoryName)
                        return <StackHeader routeAction='/categories' headerTitle={categoryName} />
                    },
                }}
            />
        </Stack>
    );
};
