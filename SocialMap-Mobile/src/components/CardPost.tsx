import React, { useContext, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from "@rneui/base";
import { navigate } from '../../RootNavigation';

import Spacer from "./Spacer";
import { Post } from '../models/Post'

import FaviriteIconButton from "../components/FavoriteIconButton";
import { Context as AuthContext } from "../context/AuthContext";
import CustomAvatar from "../components/CustomAvatar";

import server from "../api/server";
import Utils from '../Utils'



interface IProps {
    post: Post;
}

export default function CardPost({ post }: IProps) {
    const { token, createAlert } = useContext(AuthContext);
    const [liked, setLiked] = useState(post.liked)
    const [countLike, setCountLike] = useState(post.likes.length)



    const likePost = async (postId: String) => {
        try {
            await server.auth(token as string).post(`/posts/${postId}/like`)
            setLiked(true)
            setCountLike(countLike + 1)
        } catch (err) {
            createAlert({ msg: "Houve um erro ao carregar o feed!", type: "error" });
        }
    }

    const unlikePost = async (postId: String) => {
        try {
            await server.auth(token).post(`/posts/${postId}/unlike`)
            setLiked(false)
            setCountLike(countLike - 1)
        } catch (err) {
            createAlert({ msg: "Houve um erro ao carregar o feed!", type: "error" });
        }
    }

    return (
        <TouchableOpacity onPress={() => navigate('PostDetail', { id: post._id })}>
            <Card>
                <View style={style.header}>
                    <CustomAvatar id={post.profile._id} name={post.profile.name} midia={post.profile.midia} />
                    <Text style={style.name}>{Utils.capitalizeFirstLetter(post.profile.name)}</Text>
                </View>

                <Text style={style.title}>{post.title}</Text>

                {post.content ? (
                    <Text style={style.text}>{post.content}</Text>
                ) : (<Spacer />)}

                {post.midia ? (
                    <>
                        <Image source={{ uri: post.midia }} style={style.image} />
                        <Spacer />
                    </>
                ) : (<Spacer />)}

                <Card.Divider />

                <View style={style.ActionContainer}>
                    <FaviriteIconButton
                        liked={liked}
                        handleLike={() => {
                            liked
                                ? unlikePost && unlikePost(post._id)
                                : likePost && likePost(post._id)
                        }} />
                    <Text style={style.ActionItemStyle}>{countLike}</Text>

                    <MaterialIcons
                        name="chat-bubble-outline"
                        size={24}
                        color="black"
                        style={style.ActionItemStyle} />
                    <Text style={style.ActionItemStyle}>{post.comments.length}</Text>
                </View>

            </Card>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    name: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 20,
    },
    title: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 16,
    },
    text: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
    },
    image: {
        resizeMode: "contain",
        width: '100%',
        minHeight: 300,
        maxHeight: 600,
        marginTop: 15,

    },
    ActionContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignContent: "space-between",
    },
    ActionItemStyle: {
        marginLeft: 5,

    },
    errorMessageStyle: {
        color: "red",
    },
    errorContainerStyle: {
        marginTop: 20,
        alignItems: "center",
    }
})