import { View, Text, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ProductCartAction } from "@components";

const CartItemCard = ({ productId, productName, productQty, quantity, price, image }) => {
  return (
      <View className='flex flex-row mt-2 border justify-between items-center border-primary/40 rounded-xl px-3 py-2'>
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

    return (
        <>
            <ScrollView className='px-8 bg-white'>
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
            <View className='absolute bottom-0 left-0 w-full bg-teal z-50'>
                <Text>Hi da</Text>
            </View>
        </>
    );
};

export default index;
