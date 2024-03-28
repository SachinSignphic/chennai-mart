import { Stack, useLocalSearchParams } from "expo-router";
// import { Image } from "react-native";
import { StackHeader } from "@components";
import { useEffect } from "react";
import { getStorageData } from "@/utils/fetch";
import { useDispatch } from "react-redux";
import { addCartId, addToCartFromLS } from "@/context/cart";

export default Layout = () => {
    const x = useLocalSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const getCartId = async () => {
            const cartId = await getStorageData("cartId");
            console.log("🚀 ~ Home ~ cartId:", cartId);
            if (cartId) {
                console.log('yeah?');
                dispatch(addCartId(cartId));
            }
        };

        const getCartItemsFromStr = async () => {
            const cartItemsss = await getStorageData("cartItems");
            console.log(
                "🚀 ~ _laout ~ useEffect ~ cartItemsss:",
                cartItemsss
            );
            if (cartItemsss) {
                // writing to cart global state if cart items were found in storage
                dispatch(addToCartFromLS(cartItemsss));
                // remove useeffect from each productcart component and put here only
                // create a new action to add several cartitems at once! and we are done
            }
        };

        getCartItemsFromStr();
        getCartId();
        // also check if items are there and put them in global state
        // before this, i am now going to the add to cart button component and
        // trigger a write to storage
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
            <Stack.Screen
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
            />
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
