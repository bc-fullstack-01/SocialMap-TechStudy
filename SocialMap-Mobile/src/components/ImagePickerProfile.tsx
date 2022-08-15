import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagerPicker from "expo-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { File } from "../models/File"
import Spacer from "./Spacer"
import { Avatar } from "@rneui/base";

interface IProps {
    onFileLoaded: (file: File) => void
}

export default function ImagePickerProfile({ onFileLoaded }: IProps) {
    const [image, setImage] = useState()

    useEffect(() => {
        const getImage = async () => {
            var midia = await AsyncStorage.getItem('midia')
            setImage(midia)
        }
        getImage()
    }, [])

    const pickImage = async () => {
        let result = await ImagerPicker.launchImageLibraryAsync({
            mediaTypes: ImagerPicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1
        })

        if (!result.cancelled) {
            const { uri } = result
            setImage(uri)
            const name = uri.match(/[^\\/]+$/)[0]
            const file = { name, uri, type: "image/jpg" }
            onFileLoaded(file)
        }
    }

    return (
        <>
            <TouchableOpacity onPress={pickImage}>
                <View>
                    {image ? (
                        <Avatar
                            containerStyle={styles.avatar}
                            size={130}
                            source={{ uri: image }}
                            rounded
                            onPress={pickImage}
                        />
                    ) : (
                        <Text onPress={pickImage}>Selecionar Imagem</Text>
                    )}
                </View>
            </TouchableOpacity>


        </>
    )
}



const styles = StyleSheet.create({
    avatar: {
        borderColor: '#9ea3a8',
        borderWidth: 1,
    }
})