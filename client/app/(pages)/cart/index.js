import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ToastAndroid,
    Alert,
    useWindowDimensions,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { ProductCartAction, RadioButton } from "@/components";
import { router } from "expo-router";
import { getToken } from "@/utils/fetch";
import storage from "@/utils/storage";
import { addCartId } from "@/context/cart";
import { API_URL } from "@/constants";
import RBSheet from "react-native-raw-bottom-sheet";

const CartItemCard = ({
    productId,
    productName,
    productQty,
    quantity,
    price,
    image,
}) => {
    return (
        <View className='flex flex-row mt-2 flex-wrap border justify-between items-center border-primary/10 rounded-xl px-1 modern:px-2 py-2'>
            <View className='w-1/5 p-2'>
                <Image
                    resizeMode='center'
                    className='w-16 h-16 mr-2'
                    source={{ uri: image }}
                />
            </View>
            <View className='w-1/2'>
                <Text className='font-nunito-800 text-primary text-md modern:text-xl'>
                    {productName}
                </Text>
                <Text className='font-normal text-secondary text-sm modern:text-base'>
                    {productQty} • ₹{price.toFixed(2)}
                </Text>
            </View>
            <View className='w-1/5 flex items-start modern:items-center justify-center'>
                <Text className='font-nunito-400 text-primary text-md modern:text-xl mb-1'>
                    ₹{(price * quantity).toFixed(2)}
                </Text>
                <ProductCartAction productId={productId} />
            </View>
        </View>
    );
};

const Modal = RBSheet;

const index = () => {
    const productData = useSelector((state) => state.products.products);
    const cartData = useSelector((state) => state.cart);
    let totalCartAmount = cartData.items
        .map((item) => {
            let currProduct = productData.find(
                (product) => product._id == item.id
            );
            return (
                (currProduct.discounted_price === 0
                    ? currProduct.price * (1 - currProduct.discount / 100)
                    : currProduct.discounted_price) * item.quantity
            );
        })
        .reduce((prev, curr) => prev + curr, 0)
        .toFixed(2);

    const dispatch = useDispatch();

    useEffect(() => {
        const createCart = async () => {
            console.log(JSON.stringify(cartData));
            try {
                const cartCreateRequest = await fetch(API_URL + "/cart/new", {
                    method: "POST",
                    headers: {
                        Auth: await getToken(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cartData),
                });
                const cartCreateResponse = await cartCreateRequest.json();
                console.log(
                    "🚀 ~ createCart ~ cartCreateResponse:",
                    cartCreateResponse
                );

                if (cartCreateRequest.status == 403) {
                    await storage.remove({ key: "user" });
                    await storage.save({ key: "user", expires: 10 });
                    ToastAndroid.show(
                        "User Session Expired. Please login again",
                        ToastAndroid.LONG
                    );
                    router.replace("/login?showname=false");
                    return;
                }

                if (cartCreateRequest.status == 200) {
                    dispatch(addCartId(cartCreateResponse._id));
                    await storage.save({
                        key: "cartId",
                        data: cartCreateResponse._id,
                    });
                    console.log(cartCreateResponse._id + " added!");
                }
            } catch (error) {
                console.log("🚀 ~ createCart ~ error:", error);
                return;
            }
        };
        const updateCartData = async () => {
            try {
                const cartUpdateRequest = await fetch(
                    API_URL + "/cart/update",
                    {
                        method: "POST",
                        headers: {
                            Auth: await getToken(),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(cartData),
                    }
                );
                const cartUpdateResponse = await cartUpdateRequest.json();
                console.log(
                    "🚀 ~ updateCartData ~ cartUpdateResponse:",
                    cartUpdateResponse
                );

                if (cartUpdateRequest.status == 200) {
                    // here cart is updated successfully means, maybe show an indication?
                    console.log("Cart updated!");
                }

                if (cartUpdateRequest.status == 403) {
                    await storage.remove({ key: "user" });
                    await storage.save({ key: "user", expires: 10 });
                    ToastAndroid.show(
                        "User Session Expired. Please login again",
                        ToastAndroid.LONG
                    );
                    router.replace("/login?showname=false");
                    return;
                }

                if (cartUpdateRequest.status == 404) {
                    await storage.remove({ key: "cartId" });
                    dispatch(addCartId(""));
                }

                if (cartUpdateRequest.status == 500) {
                    Alert.alert(
                        "Unexpected Server Error!",
                        cartUpdateResponse.error,
                        [{ text: "OK", style: "cancel" }]
                    );
                }
            } catch (error) {
                console.log("🚀 ~ updateCartData ~ error:", error);
                return;
            }
        };

        if (cartData.cartId) {
            // POST request to send product data to endpoint
            console.log("updating cart...");
            updateCartData();
        } else {
            // hit endpoint that create new cart for user and THEN send it
            console.log("creating new cart...");
            createCart();
        }
    }, []);

    // here i removed a useffect that loads cart items from storage in _layout.js
    const modalRef = useRef();
    const { height } = useWindowDimensions();

    return (
        <>
            <ScrollView className='px-4 bg-white'>
                {cartData.items.map((cartItem, i) => {
                    let currentCartItemData = productData.find(
                        (product) => product._id == cartItem.id
                    );
                    return (
                        <CartItemCard
                            key={i}
                            productQty={
                                (currentCartItemData.quantity_no ?? "500") +
                                " " +
                                (currentCartItemData.quantity_count ?? "gm")
                            }
                            productId={currentCartItemData._id}
                            image={currentCartItemData.main_image.asset.url}
                            productName={currentCartItemData.name}
                            quantity={cartItem.quantity}
                            price={
                                currentCartItemData.discounted_price === 0
                                    ? currentCartItemData.price *
                                      (1 - currentCartItemData.discount / 100)
                                    : currentCartItemData.discounted_price
                            }
                        />
                    );
                })}
            </ScrollView>
            <View className='absolute shadow-xl shadow-black/40 bottom-0 left-0 w-full bg-teal gap-y-3 z-50 px-4 py-4 pt-0'>
                <TouchableOpacity
                    className='flex flex-row justify-between flex-wrap'
                    onPress={() => modalRef.current.open()}>
                    <Text className='text-secondary font-medium text-sm modern:text-base'>
                        No.8, 9th cross street, thirumudivakkam, Chennai
                    </Text>
                    <View className='flex flex-row'>
                        <Ionicons
                            name='location-sharp'
                            size={20}
                            color={"rgb(47,46,65)"}
                        />
                        <Text className='font-nunito-800 text-md text-primary'>
                            Change
                            <Ionicons
                                name='chevron-down-sharp'
                                size={14}
                                color='black'
                            />
                        </Text>
                    </View>
                </TouchableOpacity>
                <View className='flex flex-row justify-between gap-x-5 items-center'>
                    <View>
                        <Text className='text-md modern:text-lg font-nunito-400 text-primary'>
                            To Pay
                        </Text>
                        <Text className='text-lg modern:text-xl font-nunito-800 text-primary'>
                            ₹ {totalCartAmount}
                        </Text>
                    </View>
                    <TouchableOpacity
                        disabled={cartData.length < 0}
                        className={`flex flex-1 py-3 bg-primary rounded-lg ${
                            cartData.length < 1 && "opacity-60"
                        }`}
                        onPress={() => router.push("/cart/mockpay")}>
                        <Text className='text-white self-center font-nunito-800 text-md modern:text-lg'>
                            Proceed ▶
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal for addresses */}
            <Modal
                ref={modalRef}
                closeOnPressBack
                draggable
                customModalProps={{
                    animationType: "fade",
                    statusBarTranslucent: true,
                }}
                height={height * 0.8}>
                <RadioButton
                    title={"Sachin"}
                    subtitle={"No.8, 10th street"}
                    icon={() => (
                        <Ionicons
                            name='radio-button-off-sharp'
                            size={30}
                            color={"white"}
                        />
                    )}
                />
            </Modal>
        </>
    );
};

export default index;
