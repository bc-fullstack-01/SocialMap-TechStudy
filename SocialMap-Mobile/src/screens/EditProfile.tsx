import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/base";

import ImagePickerProfile from "../components/ImagePickerProfile"
import { navigate } from '../../RootNavigation';
import Spacer from "../components/Spacer"
import { File } from "../models/File"
import server from "../api/server";


export default function EditProfile() {
    const [file, setFile] = useState<File>()
    const [formData, setFormData] = useState({
        name: '',
        about: '',
    });


    useEffect(() => {
        const getProfile = async () => {
            try {
                const token = await AsyncStorage.getItem("accessToken")
                const id = await AsyncStorage.getItem("profile_id")
                const response = await server.auth(token).get(`/profiles/${id}`)
                setFormData({
                    name: response.data.name,
                    about: response.data.about,
                })
            } catch (error) {
                console.log(error)
            }
        }
        getProfile()
    }, [])

    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem("accessToken")

        const { name, about } = formData;
        const data = { "name": name, about: about }
        if (file) data['file'] = file
        try {
            await server.auth(token).put('/profiles', data)
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <View style={styles.container}>
            <Spacer>
                <>
                    <View style={styles.midia}>
                        <ImagePickerProfile onFileLoaded={setFile} />
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