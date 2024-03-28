import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/context/cart";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import storage from "@/utils/storage";
// import { useEffect } from "react";
// import { getStorageData } from "@/utils/fetch";

const ProductCartAction = ({ productId }) => {
    // console.log(productId)
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    // console.log(cartItems);
    const currentCartItem = cartItems.find((item) => item.id == productId);

    // useEffect(() => {
    //   const getCartItemsFromStr = async () => {
    //       const cartItemsss = await getStorageData('cartItems');
    //       console.log("🚀 ~ ProductCartAction ~ useEffect ~ cartItemsss:", cartItemsss)
    //   }
    //   getCartItemsFromStr();
    // }, [])
    

    return (
        <View className='product-card-action-container flex justify-center items-end w-full'>
            {currentCartItem && (
                <View className='rounded-xl bg-primary flex justify-center flex-row items-center gap-x-2 gap-y-0.5'>
                    <TouchableOpacity
                        hitSlop={10}
                        onPress={async () => {
                            await storage.save({ key: 'cartItems', data: cartItems.map(item => {
                                return item.id == productId && item.quantity > 1
                                    ? { ...item, quantity: --item.quantity }
                                    : item.id == productId && item.quantity == 1
                                        ? null
                                        : item;
                            }).filter(item => item != null) })
                            dispatch(removeFromCart({ id: productId }))
                        }}
                        className='w-9 h-9 flex justify-center items-center'>
                        <AntDesign
                            name='minus'
                            size={18}
                            color='white'
                            className='self-center'
                        />
                    </TouchableOpacity>
                    <Text className='text-white font-nunito-400 text-sm modern:text-base'>
                        {currentCartItem.quantity}
                    </Text>
                    <TouchableOpacity
                        hitSlop={10}
                        onPress={async () => {
                            await storage.save({ key: 'cartItems', data: cartItems.map(item => item.id == productId? {...item, quantity: ++item.quantity }: item) })
                            dispatch(addToCart({ id: productId }));
                        }}
                        className='w-9 h-9 flex justify-center items-center'>
                        <AntDesign
                            name='plus'
                            size={18}
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
            )}
            {!currentCartItem && (
                <TouchableOpacity
                    hitSlop={10}
                    onPress={async () => {
                        await storage.save({ key: 'cartItems', data: cartItems.map(item => item.id == productId? {...item, quantity: ++item.quantity }: item) })
                        dispatch(addToCart({ id: productId }))
                    }}
                    className='rounded-xl w-9 h-9 bg-primary flex justify-center items-center'>
                    <AntDesign
                        name='plus'
                        size={17}
                        color='white'
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default ProductCartAction;
