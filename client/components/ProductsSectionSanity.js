import { View, Text, Image, FlatList, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useMemo } from "react";
import { useDispatch,useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import sanity from "@/utils/sanity";
import { addProduct, addProductsArray } from "@/context/productData";

const productQuery = `
    *[_type=='products'] {
        _id,
        name,
        description,
        'category': category[] -> {_id, title, description, category_image},
        quantity_no,
        quantity_count,
        price,
        discount,
        discounted_price,
        tags,
        main_image {
            asset -> {
                url
            }
        },
        images{asset -> {url}}[]
    }[1..20]
`

const ProductsSectionSanity = ({
    sectionTitle,
    sectionActionText,
    sectionActionURL,
    sectionCategory, // use this soon for filtering products via category
    randomize
}) => {
    const productDataState = useSelector((state) => state.products.products);
    const productData = useMemo(
        () =>
            randomize
                ? productDataState
                      .map((value) => ({
                          value,
                          sort: Math.random(),
                      }))
                      .sort((a, b) => a.sort - b.sort)
                      .map(({ value }) => value)
                : productDataState,
        [randomize, productDataState]
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRandomProductData = async () => {
            if (productData.length === 0) {
                var data = await sanity.fetch(productQuery);
                console.log("check if fetch works:",data[10].name);
                dispatch(addProductsArray(data));
            }
        }
        fetchRandomProductData();
    }, [productData])

    return (
        <View className='flex flex-grow-0 w-full gap-4 px-2 mt-0.5 h-80'>
            <View className='flex px-2 flex-row justify-between items-center'>
                <Text className='text-xl modern:text-2xl font-nunito-800 text-primary'>
                    {sectionTitle}
                </Text>
                <Text className='text-sm modern:text-base font-nunito-400 text-primary'>
                    {sectionActionText}
                </Text>
            </View>
            {productData.length !== 0 ? (
                <FlatList
                    data={
                        productData
                    }
                    renderItem={({ item }) => (
                        <ProductCard
                            key={item._id}
                            id={item._id}
                            title={item.name}
                            quantity={
                                (item.quantity_no ?? "500") +
                                " " +
                                (item.quantity_count ?? "gm")
                            }
                            price={
                                item.discounted_price === 0
                                    ? (
                                          item.price *
                                          (1 - item.discount / 100)
                                      ).toFixed(1)
                                    : item.discounted_price
                            }
                            imageURL={item.main_image.asset.url}
                        />
                    )}
                    horizontal
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{
                        gap: 20,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        // height: 'auto'
                    }}
                    showsHorizontalScrollIndicator={false}
                    className='flex-grow-0'
                />
            ) : (
                <>
                    <ActivityIndicator size={29} />
                    <Text>Loading...</Text>
                </>
            )}
        </View>
    );
};

export default ProductsSectionSanity;
