import { View, Text } from 'react-native'
import React from 'react'
import { useGlobalSearchParams } from 'expo-router'

const index = () => {
  const { id } = useGlobalSearchParams();

  return (
    <View>
      <Text>User page: { id }</Text>
    </View>
  )
}

export default index