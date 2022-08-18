import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/base";

import { Context as AuthContext } from "../context/AuthContext"
import ImagePicker from "../components/ImagePicker"
import Spacer from "../components/Spacer"
import { File } from "../models/File"
import server from "../api/server";
import { navigate } from '../../RootNavigation';


interface INewPost {
    title: string
    content: string
    file?: File | null
}

export default function CreatePostScreen() {
    const { createAlert, token } = useContext(AuthContext)

    const [title, setTitle] = useState("")
    const [content, setcontent] = useState("")
    const [file, setFile] = useState<File>()

    const createPost = async () => {
        try {
            const data = new FormData()
            data.append('title', title)
            data.append('content', content)
            file ? data.append('file', file) : ''
            await server.upload(token).post('/posts', data)
            createAlert({ msg: 'Post criado com sucesso!', type: 'success' })
            navigate('PostList')
        } catch (err) {
            createAlert({ msg: 'Erro ao criar um Post', type: 'error' })
        }
    }

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
                        onPress={createPost}
                    />
                </>
            </Spacer>
        </View>
    )
}

const style = StyleSheet.create({})