import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/base";

import { Context as PostContext } from "../context/PostContext";
import ImagePicker from "../components/ImagePicker"
import Spacer from "../components/Spacer"
import { File } from "../models/File"


export default function CreatePostScreen() {
    const { createPost } = useContext(PostContext)

    const [title, setTitle] = useState("")
    const [content, setcontent] = useState("")
    const [file, setFile] = useState<File>()

    return (
        <View>
            <Spacer>
                <>
                    <Input
                        label="Titulo"
                        value={title}
                        onChangeText={setTitle}
                        autoCorrect={false}
                    />
                    <Input
                        label="Manda a boa!"
                        value={content}
                        onChangeText={setcontent}
                        multiline={true}
                        numberOfLines={3}
                    />
                    <ImagePicker onFileLoaded={setFile} />
                    <Spacer />
                    <Button
                        title="Publicar"
                        onPress={() => {
                            createPost && createPost({ title, content, file })
                        }}
                    />
                </>
            </Spacer>
        </View>
    )
}

const style = StyleSheet.create({})