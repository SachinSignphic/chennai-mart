import { Stack, useLocalSearchParams } from "expo-router";
// import { Image } from "react-native";
import { StackHeader } from "@components";
import { useEffect } from "react";
import { clearStorage, getStorageData } from "@/utils/fetch";
import { useDispatch } from "react-redux";
import { addCartId, addToCartFromLS } from "@/context/cart";

export default Layout = () => {
    const x = useLocalSearchParams();
    const dispatch = useDispatch();

    // clearStorage(['cartId', 'cartItems', 'user'])

    useEffect(() => {
        const getCartId = async () => {
            const cartId = await getStorageData("cartId");
            console.log("🚀 ~ Home _layout ~ cartId:", cartId);
            if (cartId) {
                console.log('cart id exists from storage?');
                dispatch(addCartId(cartId));
            }
        };

        const getCartItemsFromStr = async () => {
            const cartItemsss = await getStorageData("cartItems");
            console.log(
                "🚀 ~ Home _layout ~ useEffect ~ cartItemsss:",
                cartItemsss
            );
            if (cartItemsss) {
                // writing to cart global state if cart items were found in storage
                dispatch(addToCartFromLS(cartItemsss));
            }
        };

        getCartItemsFromStr();
        getCartId();
    }, []);

    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    title: "Home",
                    headerTintColor: "black",
                    headerShown: false,
                }}
            />
            {/* <Stack.Screen
                name='product'
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
            /> */}
            <Stack.Screen
                name='settings'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='user'
                options={{
                    headerBackVisible: false,
                    header: () => (
                        <StackHeader
                            // routeAction='/home'
                            headerTitle='Profile'
                        />
                    ),
                }}
            />
        </Stack>
    );
};
