import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ProductCartAction } from "@components";
import { router } from "expo-router";

const CartItemCard = ({ productId, productName, productQty, quantity, price, image }) => {
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
}

const index = () => {
    const productData = useSelector((state) => state.products.products);
    const cartData = useSelector((state) => state.cart.items);
    let totalCartAmount = cartData.map(item => {
        let currProduct = productData.find(product => product._id == item.id)
        return (currProduct.discounted_price === 0 ? (currProduct.price * (1 - (currProduct.discount / 100))) : currProduct.discounted_price) * item.quantity
    }).reduce((prev, curr) => prev + curr, 0).toFixed(2);

    return (
        <>
            <ScrollView className='px-4 bg-white'>
                {cartData.map((cartItem, i) => {
                    let currentCartItemData = productData.find(
                        (product) => product._id == cartItem.id
                    );
                    return (
                        <CartItemCard
                            key={i}
                            productQty={(currentCartItemData.quantity_no ?? "500") + " " + (currentCartItemData.quantity_count ?? "gm")}
                            productId={currentCartItemData._id}
                            image={currentCartItemData.main_image.asset.url}
                            productName={currentCartItemData.name}
                            quantity={cartItem.quantity}
                            price={(currentCartItemData.discounted_price === 0 ? (currentCartItemData.price * (1 - (currentCartItemData.discount / 100))) : currentCartItemData.discounted_price)}
                        />
                    );
                })}
            </ScrollView>
            <View className='absolute shadow-xl shadow-black/40 bottom-0 left-0 w-full bg-teal gap-y-3 z-50 px-4 py-4 pt-0'>
                <TouchableOpacity
                    className='flex flex-row justify-between flex-wrap'
                    // onPress={() => router.push("/cart/addresses")} drawer component
                >
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
                            ₹{totalCartAmount}
                        </Text>
                    </View>
                    <TouchableOpacity
                        disabled={cartData.length > 0 ? false : true}
                        className={`flex flex-1 py-3 bg-primary rounded-lg ${
                            cartData.length < 1 && "opacity-60"
                        }`}>
                        <Text className='text-white self-center font-nunito-800 text-md modern:text-lg'>
                            Proceed ▶
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default index;
