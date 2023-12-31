import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ProductCartAction } from "@components";
import { router } from "expo-router";

const CartItemCard = ({ productId, productName, productQty, quantity, price, image }) => {
  return (
      <View className='flex flex-row mt-2 flex-wrap  border justify-between items-center border-primary/10 rounded-xl px-2 py-2'>
          <View className='w-1/5 p-2'>
              <Image
                  resizeMode='center'
                  className='w-16 h-16 mr-2'
                  source={image}
              />
          </View>
          <View className='w-1/3'>
              <Text className='font-nunito-400 text-primary text-lg'>
                  {productName}
              </Text>
              <Text className='font-normal text-secondary text-base'>
                  {productQty} • ₹{price}
              </Text>
          </View>
          <View className='w-1/6'>
              <Text className='font-nunito-400 text-primary text-lg'>
                  ₹{price * quantity}
              </Text>
          </View>
          <View className='w-1/5'>
              <ProductCartAction productId={productId} />
          </View>
          {/* <ProductCartAction id={productId} /> */}
      </View>
  );
}

const index = () => {
    const productData = useSelector((state) => state.products.products);
    const cartData = useSelector((state) => state.cart.items);
    let totalCartAmount = cartData.map(item => productData.find(product => product.id == item.id).price * item.quantity).reduce((prev, curr) => prev + curr, 0);

    return (
        <>
            <ScrollView className='px-4 bg-white'>
                {cartData.map((cartItem, i) => {
                    let currentCartItemData = productData.find(
                        (product) => product.id == cartItem.id
                    );
                    return (
                        <CartItemCard
                            key={i}
                            productQty={currentCartItemData.quantity}
                            productId={currentCartItemData.id}
                            image={currentCartItemData.mainImage}
                            productName={currentCartItemData.title}
                            quantity={cartItem.quantity}
                            price={currentCartItemData.price}
                        />
                    );
                })}
            </ScrollView>
            <View className='absolute shadow-xl shadow-black/40 bottom-0 left-0 w-full bg-teal gap-y-3 z-50 px-4 py-4'>
                <TouchableOpacity
                    className='flex flex-row justify-between flex-wrap'
                    onPress={() => router.push("/cart/addresses")}>
                    <Text className='text-secondary font-medium text-base'>
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
                                size={16}
                                color='black'
                            />
                        </Text>
                    </View>
                </TouchableOpacity>
                <View className='flex flex-row justify-between gap-x-5 items-center'>
                    <View>
                        <Text className='text-lg font-nunito-400 text-primary'>
                            To Pay
                        </Text>
                        <Text className='text-xl font-nunito-800 text-primary'>
                            ₹{totalCartAmount}
                        </Text>
                    </View>
                    <TouchableOpacity
                        disabled={cartData.length > 0 ? false : true}
                        className={`flex flex-1 py-3 bg-primary rounded-lg ${(cartData.length < 1) && 'opacity-60' }`}>
                        <Text className='text-white self-center font-nunito-800 text-lg'>
                            Proceed ▶
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default index;
