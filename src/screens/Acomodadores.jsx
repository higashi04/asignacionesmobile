import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ReadAll } from '../helpers/apicCalls';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UserPlusIcon } from 'react-native-heroicons/solid';

const Acomodadores = () => {
    const [acomodadores, setAcomodadores] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newAcomodador, setNewAcomodador] = useState("");

    useEffect(() => {
        if(!isDataLoaded) {

            const fetchData = async() => {
                const response = await ReadAll();
                setAcomodadores(response);
                setIsDataLoaded(true);
            }
            fetchData();
        }
    }, [isDataLoaded])

    return(
        <View className="bg-cyan-500 flex-1 justify-center items-center">
            <View className="bg-cyan-600 rounded-full w-10/12" style={{padding: wp(5)}}>
                <Text className="font-bold text-white text-center text-2xl"> Acomodadores </Text>
            </View>
            <View className="bg-cyan-400 rounded-full w-full" style={{padding: wp(6), marginTop: hp(5)}}>
                {!isCreating ?                
                    <TouchableOpacity className="bg-green-500 rounded-full p-2" onPress={() => setIsCreating(true)}>
                        <Text className="text-white text-lg text-center">Agregar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity className="bg-red-500 rounded-full p-2" onPress={() => setIsCreating(false)}>
                        <Text className="text-white text-lg text-center">Cancelar</Text>
                    </TouchableOpacity>
                }
                <View style={{marginTop:hp(2)}}>
                    {isCreating && 
                        <View>
                            <TextInput
                                className="bg-white rounded-full p-2 mb-2"
                                placeholder="Nuevo acomodador"
                                value={newAcomodador}
                                onChangeText={setNewAcomodador}
                            />
                            <TouchableOpacity className="bg-blue-500 rounded-full p-2 flex flex-row items-center justify-center" onPress={() => console.log(newAcomodador)}>
                                <Text className="text-white text-lg text-center">Guardar</Text>
                                <UserPlusIcon color={"#fff"} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
            <View className="bg-cyan-400 rounded-full w-10/12" style={{padding: wp(5), margin: wp(5)}}>
                
            {isDataLoaded && acomodadores.map(acomodador => {
                return(
                    <View key={acomodador._id} className="flex flex-row justify-between items-center mb-2">
                        <Text className="text-xl"> {acomodador.name} </Text>
                        <TouchableOpacity className="bg-blue-500 rounded-full p-2 mx-4">
                            <Text className="text-sm text-white">Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-red-500 rounded-full p-2">
                            <Text className="text-sm text-white">Eliminar</Text>
                        </TouchableOpacity>
                    </View>
                )
            })}
            </View>
        </View>
    )
}

export default Acomodadores;