import React, { useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';


const Asignaciones = () => {
    useFocusEffect(
        useCallback(() => {
          const lock = async() => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
          }
          lock();
          return () => {
            const unlock = async() => {
              await ScreenOrientation.unlockAsync();
            }
            unlock();
          }
        }, [])
      );

    return (
        <View  className="bg-gray-100 mt-12 flex-1 justify-center items-center p-6">
        <ScrollView className="p-4">
            <View className="flex flex-row ps-6">
                <View className='mt-4'                  
                    style={{
                      transform: [{ rotate: '-90deg' }],
                      textAlign: "center",
                      width: 100,
                    }}
                >
                <Text className="text-black font-bold mb-4 ms-2">
                  Semana
                </Text>
                <Text className="text-center bg-[#C6EFCE] text-[#006100] font-bold border-black border-2 py-0.5">
                    Limpieza
                </Text>
                <Text className="text-center bg-[#FFEB9C] text-[#9C5700] font-bold border-black border-2 py-0.5">
                    Hospitalidad
                </Text>
                </View>
                <Text className="text-xl font-bold text-center pt-8 ms-8">Asignaciones</Text>
            </View>

            <View className="flex flex-col mt-3 border-6 border-black">
                {/* Inner Headers */}
                <View className="border-2 border-black flex flex-row w-full">
                    <Text className="border-black border-2 w-[8%]">{" "}</Text>
                    <Text className="border-black border-2 w-[8%] p-0">Grupo</Text>
                    <Text className="border-black border-2 w-[9%] text-center">Video</Text>
                    <Text className="border-black border-2 w-[9%] text-center">Audio</Text>
                    <Text className="border-black border-2 w-[18%] text-center">Auditorio</Text>
                    <Text className="border-black border-2 w-[18%] text-center">Accesos</Text>
                    <Text className="border-black border-2 w-[10%] text-center">Lector</Text>
                    <Text className="border-black border-2 w-[10%] text-center">Recibidor *</Text>
                    <Text className="border-black border-2 w-[10%] text-center">Preside</Text>
                </View>

                {/* Empieza lo bueno */}

                <View className="border-2 border-black flex flex-row w-fit">
                    <Text className="text-wrap w-[8%]">2 al 8 de Dic </Text>
                    <Text className="border-2 border-black bg-[#C6EFCE] text-[#006100] text-center w-[4%]">4</Text>
                    <Text className="border-2 border-black bg-[#FFEB9C] text-[#9C5700] text-center w-[4%]">7</Text>
                    <Text className="text-wrap w-[9%] text-center border-black border-2">Edgar</Text>
                    <Text className="text-wrap w-[9%] text-center border-black border-2">Eliseo R</Text>
                    <Text className="text-wrap w-[9%] text-center border-black border-2">Sergio V</Text>
                    <Text className="text-wrap w-[9%] text-center border-black border-2">Orlando V</Text>
                    <Text className="text-wrap w-[9%] text-center border-black border-2">Reynaldo V</Text>
                    <Text className="text-wrap w-[9%] text-center border-black border-2">Eduardo V</Text>
                    <Text className="text-wrap w-[10%] text-center border-black border-2">Ismael A</Text>
                    <Text className="text-wrap w-[10%] text-center border-black border-2">Gustavo M</Text>
                    <Text className="text-wrap w-[10%] text-center border-black border-2">{" "}</Text>
                </View>

            </View>

            {/* Note */}
            <Text className="text-sm text-center italic mb-6 text-gray-600">
                NOTA: Por favor, notifique en caso de no poder cumplir su asignación. La
                labor de los acomodadores empieza 30 minutos antes y termina 30 minutos
                después.
            </Text>
        </ScrollView>
        </View>
      );
};

export default Asignaciones;