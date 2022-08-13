import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagerPicker from "expo-image-picker"

import { File } from "../models/File"
import Spacer from "./Spacer"

//1:21:20
//2:02:08
// 1:23:00


interface IProps {
    onFileLoaded: (file: File) => void
}

export default function ImagePicker({ onFileLoaded }: IProps) {
    const [image, setImage] = useState(null)

    const pickImage = async () => {
        let result = await ImagerPicker.launchImageLibraryAsync({
            mediaTypes: ImagerPicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.cancelled) {
            const { uri } = result
            console.log(result)
            setImage(uri)
            const name = uri.match(/[^\\/]+$/)[0]
            const file = { name, uri, type: "image/jpg" }
            onFileLoaded(file)
        }
    }

    return (
        <>
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.imagePickerDiv}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} resizeMethod="scale"/>
                    ) : (
                        <Text onPress={pickImage}>Selecionar Imagem</Text>
                    )}
                </View>
            </TouchableOpacity>


        </>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    imagePickerDiv: {
        minHeight: 85,
        maxHeight: 420,
        justifyContent: "center",
        alignItems: "center",

        paddingBottom: 15,
        paddingTop: 15,

        borderRadius: 10,
        borderStyle: "dotted",
        borderColor: 'black',
        borderWidth: 2,
    },
    image: {
        borderRadius: 10,
        width: 320,
        height: 240,

        // objectFit: "fill",
    }
})