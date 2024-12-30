import { Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const Home = () => {

    const ringOnePadding = useSharedValue(0);
    const ringTwoPadding = useSharedValue(0);
    const ringThreePadding = useSharedValue(0);
    const ringFourPadding = useSharedValue(0);

    useEffect(() => {
        ringOnePadding.value = 0;
        ringTwoPadding.value = 0;
        ringThreePadding.value = 0;
        ringFourPadding.value = 0;

        setTimeout(() => {
            ringOnePadding.value = withSpring(ringOnePadding.value + hp(2));
            ringThreePadding.value = withSpring(ringThreePadding.value + hp(2));
        }, 100);
        setTimeout(() => {
            ringTwoPadding.value = withSpring(ringTwoPadding.value + hp(2));
            ringFourPadding.value = withSpring(ringFourPadding.value + hp(2));
        }, 300)
    }, [])

  return (
    <View className="bg-cyan-500 flex-1 justify-center items-center">
        <StatusBar style="dark" />
        <View className="flex flex-row gap-4">
            <Text className="text-2xl text-center text-white font-bold">Placeholder</Text>
        </View>
    </View>
  )
}

export default Home;
