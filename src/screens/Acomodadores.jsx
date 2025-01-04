import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { ReadAll, CreateAcomodador, UpdateAcomodador, DeleteAcomodador } from '../helpers/apicCalls';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { UserPlusIcon, UserMinusIcon, UserIcon } from 'react-native-heroicons/solid';
import AwesomeAlert from 'react-native-awesome-alerts';

const Acomodadores = () => {
    const [acomodadores, setAcomodadores] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [newAcomodador, setNewAcomodador] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [alertBtnColor, setAlertBtnColor] = useState("");
    const [idEditar, setIdEditar] = useState("");

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

    const handleCreateAcomodador = async() => {
        try {
            if(newAcomodador === "") { 
                setShowAlert(true);
                setAlert("Nombre de acomodador no puede estar vacío");
                setAlertTitle("Error");
                setAlertBtnColor("#b91c1c");
                return;
            }
            const response = await CreateAcomodador(newAcomodador);
            setAcomodadores([...acomodadores, response]);
            setNewAcomodador("");
            setIsCreating(false);
            setAlertTitle("Éxito");
            setAlertBtnColor("#166534");
            setAlert(`Acomodador ${response.name} creado con éxito`);
            setShowAlert(true);
        } catch (error) {
            setAlert("Error al crear acomodador");
            setAlertTitle("Error");
            setAlertBtnColor("#b91c1c");
            setShowAlert(true);
        }
    }

    const handleUpdateAcomodador = async() => {
        try {
            const response = await UpdateAcomodador(idEditar, newAcomodador);
            setAcomodadores(acomodadores.map(acomodador => acomodador._id === idEditar ? response : acomodador));
            setNewAcomodador("");
            setIdEditar("");
            setAlertTitle("Éxito");
            setAlertBtnColor("#166534");
            setAlert(`Acomodador actualizado con éxito`);
            setShowAlert(true);

        } catch (error) {
            setAlert("Error al actualizar acomodador");
            setAlertTitle("Error");
            setAlertBtnColor("#b91c1c");
            setShowAlert(true);
        }
    }

    const handleDeleteAcomodador = async(id) => {
        try {
            await DeleteAcomodador(id);
            setAcomodadores(acomodadores.filter(acomodador => acomodador._id !== id));
            setAlertTitle("Éxito");
            setAlertBtnColor("#166534");
            setAlert(`Acomodador eliminado con éxito`);
            setShowAlert(true);
        } catch (error) {
            setAlert("Error al eliminar acomodador");
            setAlertTitle("Error");
            setAlertBtnColor("#b91c1c");
            setShowAlert(true);
        }
    }

    const handleSetEditar = (id) => {
        if(idEditar === id) {
            setIdEditar("");
        } else {
            setIsCreating(false);
            setIdEditar(id);
            setNewAcomodador(acomodadores.find(acomodador => acomodador._id === id).name);
        }
    }

    return(
        <View className="bg-gray-700 flex-1 justify-center items-center">
            <View className="bg-gray-500 rounded-full w-full" style={{padding: wp(5)}}>
                <Text className="font-bold text-white text-center text-2xl"> Acomodadores </Text>
            </View>
            <View className="bg-gray-400 rounded-full w-full" style={{padding: wp(6), marginTop: hp(5)}}>
                {!isCreating ?                
                    <TouchableOpacity className="bg-green-500 rounded-full p-2" onPress={() => setIsCreating(true)} disabled={idEditar !== ""}>
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
                            <TouchableOpacity className="bg-blue-500 rounded-full p-2 flex flex-row items-center justify-center" onPress={handleCreateAcomodador}>
                                <Text className="text-white text-lg text-center">Guardar</Text>
                                <UserPlusIcon color={"#fff"} />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>

            <View className="p-5 w-full">
            <ScrollView className="bg-gray-400 w-full h-1/2" contentContainerStyle={{ padding: wp(5), margin: wp(5) }}>
            {isDataLoaded && acomodadores.map(acomodador => {
                return(
                    <View key={acomodador._id} className="flex flex-row justify-between items-center mb-2 bg-gray-700 p-3 rounded-lg">
                        {
                            idEditar === acomodador._id ?
                            <>
                            <TextInput
                                className="bg-white rounded-full p-2 mb-2"
                                placeholder="Nuevo nombre"
                                value={newAcomodador}
                                onChangeText={setNewAcomodador}
                            />
                            <TouchableOpacity className="bg-blue-500 rounded-full p-2 flex flex-row items-center justify-center" 
                                onPress={handleUpdateAcomodador}
                            >
                                <Text className="text-white text-lg text-center">Guardar</Text>
                                <UserIcon color={"#fff"} />
                            </TouchableOpacity>
                            </>
                            :
                            <Text className="text-xl text-white flex-1"> {acomodador.name} </Text>
                        }
                        <TouchableOpacity className="bg-blue-500 rounded-full p-2 flex items-center justify-center mr-2"
                            onPress={() => handleSetEditar(acomodador._id)}
                        >
                            <Text className="text-sm text-white text-center">
                                {idEditar === acomodador._id ? "Cancelar" : "Editar"}
                            </Text>
                            <UserIcon color={"#fff"} />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-red-500 rounded-full p-2 flex items-center justify-center"
                            onPress={() => handleDeleteAcomodador(acomodador._id)}
                        >
                            <Text className="text-sm text-white text-center">
                                Eliminar
                            </Text>
                            <UserMinusIcon color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                )
            })}
            </ScrollView>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title={alertTitle}
                message={alert}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor={alertBtnColor}
                onConfirmPressed={() => {
                    setShowAlert(false);
                }}
            />
        </View>
    )
}

export default Acomodadores;