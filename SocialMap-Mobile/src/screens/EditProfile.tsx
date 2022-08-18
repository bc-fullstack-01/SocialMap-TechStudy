import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/base";

import { Context as AuthContext } from "../context/AuthContext"
import ImagePickerProfile from "../components/ImagePickerProfile"
import { navigate } from '../../RootNavigation';
import Spacer from "../components/Spacer"
import { File } from "../models/File"
import server from "../api/server";


export default function EditProfile() {
    const { createAlert, token, profile_id, getProfile } = useContext(AuthContext)

    const [file, setFile] = useState<File>()
    const [midia, setMidia] = useState<string>()
    const [formData, setFormData] = useState({
        name: '',
        about: '',
    });


    useEffect(() => {
        const getProfileApi = async () => {
            try {
                const response = await server.auth(token).get(`/profiles/${profile_id}`)
                setFormData({
                    name: response.data.name,
                    about: response.data.about,
                })
                response.data.midia && setMidia(response.data.midia)
            } catch (error) {
                createAlert({ msg: 'Erro ao obter o perfil', type: 'error' })
            }
        }
        getProfileApi()
    }, [])

    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem("accessToken")

        const { name, about } = formData;
        const data = new FormData()
        data.append("name", name);
        data.append("about", about);
        if (file) data.append("file", file);
        try {
            await server.upload(token).put('/profiles', data)
            createAlert({ msg: 'Perfil editado com sucesso!', type: 'success' })
            getProfile()
            navigate('PostList')
        } catch (err) {
            createAlert({ msg: 'Algo deu errado. Por favor tente mais tarde!', type: 'error' })
        }
    }


    return (
        <View style={styles.container}>
            <Spacer>
                <>
                    <View style={styles.midia}>
                        <ImagePickerProfile onFileLoaded={setFile} name={formData.name} midia={midia} />
                    </View >

                    <View style={styles.retrai}>
                        <Input
                            label="Nome"
                            value={formData.name}
                            onChangeText={(value) => setFormData({ ...formData, name: value })}
                            autoCorrect={false}
                        />
                        <Input
                            label="Descrição"
                            value={formData.about}
                            onChangeText={(value) => setFormData({ ...formData, about: value })}
                            multiline={true}
                            numberOfLines={3}
                            autoCorrect={false}
                        />
                        <Spacer />
                        <View style={styles.bottonsContainer}>
                            <Button
                                buttonStyle={styles.button}
                                title="Cancelar"
                                color={"error"}
                                onPress={() => navigate('PostList')}
                            />
                            <Button
                                buttonStyle={styles.button}
                                title="Publicar"
                                color={"success"}
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>

                </>
            </Spacer>
        </View>
    )
}
const image_size = 130

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        backgroundColor: 'white',
        margin: 15,
        marginTop: image_size / 2 + 30,
        borderColor: '#9ea3a8',
        borderWidth: 1,
    },
    midia: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        top: (image_size / -2),
        borderRadius: 50,
    },
    bottonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    button: {
        borderRadius: 10,
        width: 100,
        height: 45,
    },
    retrai: {
        top: (image_size / -2.2)
    },
})