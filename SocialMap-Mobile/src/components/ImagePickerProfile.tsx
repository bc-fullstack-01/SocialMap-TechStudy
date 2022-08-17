import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagerPicker from "expo-image-picker"

import { File } from "../models/File"
import CustomAvatar from "./CustomAvatar"

interface IProps {
    onFileLoaded: (file: File) => void
    midia?: string
    name: string
}

export default function ImagePickerProfile({ onFileLoaded, midia, name }: IProps) {
    const [image, setImage] = useState()

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
                    <CustomAvatar
                        name={name}
                        midia={image ? image : midia}
                        size={130}
                        style={styles.avatar}
                        onPress={pickImage}
                    />
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