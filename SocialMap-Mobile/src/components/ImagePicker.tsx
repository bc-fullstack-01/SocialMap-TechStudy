import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagerPicker from "expo-image-picker"
import { Button } from "@rneui/base";

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
    console.log(image)

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
            const file = { name, uri, type: "image/jpg", data: result.data }
            onFileLoaded(file)
        }
    }

    return (
        <>
            <Button style={styles.imagePicker} title="Selecionar Imagem" onPress={pickImage} />
            {image && (
                <View style={styles.container}>
                    <Spacer>
                        <Image source={{ uri: image }} style={styles.image} />
                    </Spacer>
                </View>
            )}
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center"
    },
    imagePicker: {
        alignItems: "center",
        justifyContent: "center",
        width: "33%"
    },
    image: {
        alignItems: "center",
        justifyContent: "center"
    }
})