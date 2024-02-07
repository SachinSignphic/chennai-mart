import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import OnboardingScreens from '@/components/OnboardingScreens'
import { Entypo } from '@expo/vector-icons'

const wallet = () => {
    const [walletData, setWalletData] = useState(null);

    useEffect(() => {
        const dummyWalletDataStateChanger = () => {
            setWalletData({ balance: 5628 });
        }

        setTimeout(dummyWalletDataStateChanger, 3000);

        return () => clearTimeout(dummyWalletDataStateChanger, 3000);
    }, [])

    return (
        <OnboardingScreens>
            <View className='flex w-full my-10' />
            <Entypo name="wallet" size={64} color="black" />
            <Text className='text-primary mt-6 text-base modern:text-lg font-nunito-400'>
                {
                    walletData ? 'Your wallet balance' : 'Fetching wallet balance..'
                }
            </Text>
            {
                walletData ? <Text className='text-primary text-xl modern:text-2xl mt-2 font-nunito-800'>₹ {walletData.balance} </Text> : <ActivityIndicator size={48} />
            }
        </OnboardingScreens>
    )
}

export default wallet