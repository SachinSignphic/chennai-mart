import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const choosecity = () => {
    return (
       <View>
          <Link href={"/loc?city=Chennai"} className='underline'>
              Choose Chennai and continue
          </Link>
      </View>
    )
}

export default choosecity