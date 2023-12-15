import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router'

const index = () => {
  const { id } = useGlobalSearchParams();

  return (
    <View>
      <Text>Product Page for product ID: { id }</Text>
    </View>
  )
}

export default index