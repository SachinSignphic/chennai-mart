import { View, Text, useWindowDimensions, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";
import RadioButton from "./RadioButton";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { populateAddresses, selectedAddress } from "@/context/address";
import { router } from "expo-router";
import { API_URL } from "@/constants";
import { getToken } from "@/utils/fetch";
import storage from "@/utils/storage";

const Modal = RBSheet;

const AddressModal = forwardRef((props, ref) => {
    const { height } = useWindowDimensions();
    const addressData = useSelector(state => state.address);
    console.log("🚀 ~ AddressModal ~ addressData:", addressData)
    
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchUserAddresses = async () => {
          try {
              const addressRequest = await fetch(API_URL + "/address", {
                  method: "GET",
                  headers: {
                      Auth: await getToken(),
                  },
              });
              const addressResponse = await addressRequest.json();
              console.log("🚀 ~ fetchUserAddresses ~ addressResponse:", addressResponse)

              if (addressRequest.status == 403) {
                  await storage.remove({ key: "user" });
                  await storage.save({ key: "user", expires: 10 });
                  ToastAndroid.show(
                      "User Session Expired. Please login again",
                      ToastAndroid.LONG
                  );
                  router.replace("/login?showname=false");
                  return;
              }

              if (addressRequest.status == 200) {
                 dispatch(populateAddresses(addressResponse.data.map(addr => ({ ...addr, id: addr._id }))));
              }
          } catch (error) {
              console.log("🚀 ~ fetchUserAddresses ~ error:", error)
              Alert.alert(
                  "Unexpected Error!",
                  error + '',
                  [{ text: "OK", style: "cancel" }]
              );
              return;
          }
      };

      if (addressData.allAddresses.length == 0) {
        fetchUserAddresses(); 
      }
    }, []);
    

    return (
        <Modal
            ref={ref}
            closeOnPressBack
            draggable
            customModalProps={{
                animationType: "fade",
                statusBarTranslucent: true,
            }}
            height={height * 0.8}>
            <ScrollView className='px-4 bg-white'>
                <Text className='font-nunito-400 mb-6 text-lg modern:text-xl text-primary'>
                    Choose from your addresses
                </Text>
                {addressData.allAddresses.map((addr, i) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={i}
                        className='mb-4 mx-1'
                        onPress={() => {
                            dispatch(selectedAddress(addr.id));
                            ref.current.close();
                        }}>
                        <RadioButton
                            title={addr.firstName}
                            subtitle={addr.streetLandmark}
                            selected={addressData.selected == addr.id}
                            icon={() => (
                                <Ionicons
                                    name='radio-button-off-sharp'
                                    size={30}
                                    color={"white"}
                                />
                            )}
                            selectedIcon={() => (
                                <Ionicons
                                    name='radio-button-off-sharp'
                                    size={30}
                                    color={"black"}
                                />
                            )}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </Modal>
    );
});

export default AddressModal;
